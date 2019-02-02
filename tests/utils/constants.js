const ERC20_TOKEN_DATA_ID = 'ERC20Token(address)'
const ERC721_TOKEN_DATA_ID = 'ERC721Token(address,uint256)'
const BALANCE_THRESHOLD_DATA_ID = 'BalanceThreshold(address,uint256)'
const OWNERSHIP_DATA_ID = 'Ownership(address,uint256)'
const FILLED_TIMES_DATA_ID = 'FilledTimes(uint256)'

const NULL_ADDERSS =  '0x0000000000000000000000000000000000000000'
const ZERO_UINT256 =  '0x0000000000000000000000000000000000000000000000000000000000000000'
const MAX_UINT256 =  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const SMALL_DECIMAL = 9

const SCHEMAS = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'verifyingContract', type: 'address' },
  ],
  Order: [
    { name: 'makerAddress', type: 'address' },
    { name: 'takerAddress', type: 'address' },
    { name: 'feeRecipientAddress', type: 'address' },
    { name: 'senderAddress', type: 'address' },
    { name: 'makerAssetAmount', type: 'uint256' },
    { name: 'takerAssetAmount', type: 'uint256' },
    { name: 'makerFee', type: 'uint256' },
    { name: 'takerFee', type: 'uint256' },
    { name: 'expirationTimeSeconds', type: 'uint256' },
    { name: 'salt', type: 'uint256' },
    { name: 'makerAssetData', type: 'bytes' },
    { name: 'takerAssetData', type: 'bytes' },
  ],
  ZeroExTransaction: [
    { name: 'salt', type: 'uint256' },
    { name: 'signerAddress', type: 'address' },
    { name: 'data', type: 'bytes' },
  ],
}

const CX = {
  gas: 6500000,
  gasPrice: 1,
}

module.exports = {
  ERC20_TOKEN_DATA_ID,
  ERC721_TOKEN_DATA_ID,
  BALANCE_THRESHOLD_DATA_ID,
  OWNERSHIP_DATA_ID,
  FILLED_TIMES_DATA_ID,
  NULL_ADDERSS,
  ZERO_UINT256,
  MAX_UINT256,
  SMALL_DECIMAL,
  SCHEMAS,
  CX,
}
