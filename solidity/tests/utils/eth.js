/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
require('dotenv').config()
const Eth = require('web3-eth')
const Method = require('web3-core-method')
const WebSocketProvider = require('web3-providers-ws')

const eth = new Eth(new WebSocketProvider('ws://localhost:8545'))

const _sendTransaction = eth.sendTransaction
const _disconnect = eth.currentProvider.disconnect
const gasUsed = {}
eth.sendTransaction = async (options, recordId) => {
  try {
    const receipt = await _sendTransaction(options)
    if (recordId) {
      gasUsed[recordId] = receipt.gasUsed
    }
    return receipt
  } catch (e) {
    throw (e)
  }
}
eth.currentProvider.disconnect = () => {
  console.table(Object.keys(gasUsed).map(k => ({ method: k, gasUsed: gasUsed[k] })))
  _disconnect()
}

const methods = [
  new Method({
    name: 'takeSnapshot',
    call: 'evm_snapshot',
    params: 0,
  }),
  new Method({
    name: 'revertSnapshot',
    call: 'evm_revert',
    params: 1,
  }),
]

methods.forEach(method => {
  method.attachToObject(eth)
  method.setRequestManager(eth._requestManager, eth.accounts)
  method.defaultBlock = eth.defaultBlock
  method.defaultAccount = eth.defaultAccount
})

eth.lifecycle = {
  snapshotId: 0x1,
  async start() {
    eth.lifecycle.snapshotId = await eth.takeSnapshot()
  },
  async revert() {
    await eth.revertSnapshot(eth.lifecycle.snapshotId)
  },
}

module.exports = eth
