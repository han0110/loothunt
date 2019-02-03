import { recoverTypedSignature, TypedDataUtils } from 'eth-sig-util'
import { fromRpcSig } from 'ethereumjs-util'
import { SINGATURE_TYPES, EIP712_SCHEMAS, EIP712_DOMAIN } from './constants'

const createTypedData = (primaryType, message) => ({
  types: {
    EIP712Domain: EIP712_SCHEMAS.EIP712Domain,
    [primaryType]: EIP712_SCHEMAS[primaryType],
  },
  domain: EIP712_DOMAIN,
  primaryType,
  message,
})

const toZeroExSignatureFormat = (signature, type) => {
  const { v, r, s } = fromRpcSig(signature)
  return `0x${v.toString(16)}${r.toString('hex')}${s.toString('hex')}${type}`
}

const normalizeZeroExSignature = signature => (
  `0x${signature.substr(4, 64)}${signature.substr(68, 64)}${signature.substr(2, 2)}`
)

const ecSignTypedData = async (provider, primaryType, message) => {
  const typedData = createTypedData(primaryType, message)
  const signer = provider.selectedAddress

  return new Promise((resolve, reject) => {
    provider.sendAsync({
      method: 'eth_signTypedData_v3',
      params: [signer, JSON.stringify(typedData)],
      from: signer
    }, (err, result) => {
      if (err) {
        reject(err)
      } else if (result.error) {
        reject(err)
      } else if (recoverTypedSignature({ data: typedData, sig: result.result }).toLowerCase() === signer.toLowerCase()) {
        resolve({
          hash: `0x${TypedDataUtils.sign(typedData).toString('hex')}`,
          signature: toZeroExSignatureFormat(result.result, SINGATURE_TYPES.EIP712)
        })
      } else {
        reject(new Error('Error: ecSignTypedData recovery error'))
      }
    })
  })
}

const ecRecoverTypedSignature = (primaryType, message, signature) => {
  const typedData = createTypedData(primaryType, message)
  return recoverTypedSignature({
    data: typedData,
    sig: normalizeZeroExSignature(signature),
  })
}

export default {
  ecSignTypedData,
  ecRecoverTypedSignature,
}