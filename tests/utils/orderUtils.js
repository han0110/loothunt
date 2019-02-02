const { TypedDataUtils } = require('eth-sig-util')
const { fromRpcSig } = require('ethereumjs-util')
const { simpleEncode } = require('ethereumjs-abi')

const {
  ERC20_TOKEN_DATA_ID,
  ERC721_TOKEN_DATA_ID,
  SCHEMAS,
} = require('./constants')

const encodeERC20AssetData = contractAddress => (
  `0x${simpleEncode(ERC20_TOKEN_DATA_ID, contractAddress).toString('hex')}`
)

const encodeERC721AssetData = (contractAddress, tokenId) => (
  `0x${simpleEncode(ERC721_TOKEN_DATA_ID, contractAddress, tokenId).toString('hex')}`
)

const encodeRequirementData = (requirementFilterAddress, requirements = []) => {
  let data = encodeERC20AssetData(requirementFilterAddress)
  requirements.forEach(requirement => {
    data += simpleEncode(requirement.dataId, ...requirement.args).toString('hex')
  })
  return data
}

const createOrderTypedData = order => ({
  types: {
    EIP712Domain: SCHEMAS.EIP712Domain,
    Order: SCHEMAS.Order,
  },
  primaryType: 'Order',
  domain: {
    name: '0x Protocol',
    version: '2',
    verifyingContract: order.exchangeAddress,
  },
  message: order,
})

const createZeroExTxTypedData = tx => ({
  types: {
    EIP712Domain: SCHEMAS.EIP712Domain,
    ZeroExTransaction: SCHEMAS.ZeroExTransaction,
  },
  primaryType: 'ZeroExTransaction',
  domain: {
    name: '0x Protocol',
    version: '2',
    verifyingContract: tx.exchangeAddress,
  },
  message: tx,
})

const getOrderHash = order => (
  `0x${TypedDataUtils.sign(createOrderTypedData(order)).toString('hex')}`
  )
  
const getZeroExTxHash = tx => (
  `0x${TypedDataUtils.sign(createZeroExTxTypedData(tx)).toString('hex')}`
)

const toZeroExSignatureFormat = (signature, type) => {
  const { v, r, s } = fromRpcSig(signature)
  return `0x${v.toString(16)}${r.toString('hex')}${s.toString('hex')}${type}`
}

const ecSignHash = async (eth, hash, signer) => {
  const signature = await eth.sign(hash, signer)
  return toZeroExSignatureFormat(signature, '03')
}

module.exports = {
  encodeERC20AssetData,
  encodeERC721AssetData,
  encodeRequirementData,
  getZeroExTxHash,
  getOrderHash,
  ecSignHash,
}