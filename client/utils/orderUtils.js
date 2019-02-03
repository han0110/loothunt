import { toHex, randomHex } from 'web3-utils'
import signUtils from './signUtils'

const genSalt = () => randomHex(32)

const getExpirationTime = (days = 365) => {
  const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1000).getTime()
  return toHex(Math.ceil(now / 1000) + (86400 * days))
}

const ecSignOrder = (provider, order) =>
  signUtils.ecSignTypedData(provider, 'Order', order)
  
const ecSignTx = (provider, tx) =>
  signUtils.ecSignTypedData(provider, 'ZeroExTransaction', tx)

export default {
  genSalt,
  getExpirationTime,
  ecSignOrder,
  ecSignTx,
}