import Eth from 'web3-eth'

class ETH extends Eth {
  send = async options =>
    new Promise((resolve, reject) => {
      try {
        const txInstance = this.sendTransaction({
          ...options,
          from: this.currentProvider.selectedAddress,
        }).on('transactionHash', txHash => {
          resolve({ txHash, txInstance })
        })
      } catch (e) {
        reject(e)
      }
    })

  getSelectedBalance = async () =>
    this.getBalance(this.currentProvider.selectedAddress)

  getProviderState = () => {
    const {
      networkVersion,
      selectedAddress,
    } = this.currentProvider
    return {
      networkId: parseInt(networkVersion, 10),
      selectedAddress,
    }
  }

  findProviderAndSet = async () => {
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      this.currentProvider =
        window.ethereum || window.web3.currentProvider

      if (await this.currentProvider.enable()) {
        return true
      }
    }

    return false
  }
}

export default ETH
