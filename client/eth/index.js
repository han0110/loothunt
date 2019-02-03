import ETH from './eth'
import { abiUtils, orderUtils } from '../utils'
import { CONTRACT_ADDRESSES } from '../utils/constants'

class ETHWrapper extends ETH {
  async signZeroExTransaction(order, orderSignature) {
    try {
      const tx = {
        salt: orderUtils.genSalt(),
        signerAddress: this.currentProvider.selectedAddress,
        data: abiUtils.encodeFunctionCall('fillOrder', [order, '0x01', orderSignature]),
      }
      const { signature: txSignature } = await orderUtils.ecSignTx(this.currentProvider, tx)

      return { tx, txSignature }
    } catch (e) {
      throw (e)
    }
  }

  async sendExecuteTransaction(tx, signature) {
    try {
      const options = {
        to: CONTRACT_ADDRESSES.REQUIREMENT_FILTER,
        data: abiUtils.encodeFunctionCall(
          'executeTransaction',
          [tx.salt, tx.signerAddress, tx.data, signature],
        ),
      }
      const { txHash, txInstance } = await this.send(options)

      return { txHash, txInstance }
    } catch (e) {
      throw (e)
    }
  }

  async getRequirementAchieved(order, hunter) {
    try {
      const options = {
        to: CONTRACT_ADDRESSES.REQUIREMENT_FILTER,
        data: abiUtils.encodeFunctionCall(
          'getRequirementsAchieved',
          [order.takerAssetData, hunter],
        ),
      }
      const data = await this.call(options)
      return abiUtils.decodeParameters('getRequirementsAchieved', data).requirementsAchieved
    } catch (e) {
      throw (e)
    }
  }
}

const eth = new ETHWrapper()

export default eth