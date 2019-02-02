/* eslint-disable no-await-in-loop */
const { simpleEncode } = require('ethereumjs-abi')
const DummyERC20Token = require('@0x/contracts-tokens/generated-artifacts/DummyERC20Token.json')
const DummyERC721Token = require('@0x/contracts-tokens/generated-artifacts/DummyERC721Token.json')
const ERC20Proxy = require('@0x/contracts-protocol/generated-artifacts/ERC20Proxy.json')
const ERC721Proxy = require('@0x/contracts-protocol/generated-artifacts/ERC721Proxy.json')
const Exchange = require('@0x/contracts-protocol/generated-artifacts/Exchange.json')
const RequirementFilter = require('../generated-artifacts/RequirementFilter.json')
const { ERC20_TOKEN_DATA_ID } = require('./constants')
const eth = require('./eth')
const { CX } = require('./constants')

const erc20Deployer = new eth.Contract(DummyERC20Token.compilerOutput.abi).deploy({
  data: DummyERC20Token.compilerOutput.evm.bytecode.object,
  arguments: ['', '', '', ''],
})
const erc721Deployer = new eth.Contract(DummyERC721Token.compilerOutput.abi).deploy({
  data: DummyERC721Token.compilerOutput.evm.bytecode.object,
  arguments: ['', ''],
})
const erc20ProxyDeployer = new eth.Contract(ERC20Proxy.compilerOutput.abi).deploy({
  data: ERC20Proxy.compilerOutput.evm.bytecode.object,
  arguments: [],
})
const erc721ProxyDeployer = new eth.Contract(ERC721Proxy.compilerOutput.abi).deploy({
  data: ERC721Proxy.compilerOutput.evm.bytecode.object,
  arguments: [],
})
const exchangeDeployer = new eth.Contract(Exchange.compilerOutput.abi).deploy({
  data: Exchange.compilerOutput.evm.bytecode.object,
  arguments: [''],
})
const requirementFilterDeployer = new eth.Contract(RequirementFilter.abi).deploy({
  data: RequirementFilter.bytecode,
  arguments: [''],
})

const deployERC20 = async (argss) => {
  const erc20Tokens = []
  for (let i = 0, l = argss.length; i < l; i += 1) {
    erc20Deployer.arguments = argss[i]
    const erc20Token = await erc20Deployer.send({ from: eth.defaultAccount, ...CX })
    erc20Tokens.push(erc20Token)
  }
  return erc20Tokens
}

const deployERC721 = async (argss) => {
  const erc721Tokens = []
  for (let i = 0, l = argss.length; i < l; i += 1) {
    erc721Deployer.arguments = argss[i]
    const erc721Token = await erc721Deployer.send({ from: eth.defaultAccount, ...CX })
    erc721Tokens.push(erc721Token)
  }
  return erc721Tokens
}

const deployProtocol = async (zrxToken) => {
  exchangeDeployer.arguments = [`0x${simpleEncode(ERC20_TOKEN_DATA_ID, zrxToken.options.address).toString('hex')}`]
  const exchange = await exchangeDeployer.send({ from: eth.defaultAccount, ...CX })
  const erc20Proxy = await erc20ProxyDeployer.send({ from: eth.defaultAccount, ...CX })
  const erc721Proxy = await erc721ProxyDeployer.send({ from: eth.defaultAccount, ...CX })
  
  await eth.sendTransaction({
    to: exchange.options.address,
    from: eth.defaultAccount,
    data: exchange.methods.registerAssetProxy(erc20Proxy.options.address).encodeABI(),
    ...CX,
  })
  await eth.sendTransaction({
    to: exchange.options.address,
    from: eth.defaultAccount,
    data: exchange.methods.registerAssetProxy(erc721Proxy.options.address).encodeABI(),
    ...CX,
  })
  await eth.sendTransaction({
    to: erc20Proxy.options.address,
    from: eth.defaultAccount,
    data: erc20Proxy.methods.addAuthorizedAddress(exchange.options.address).encodeABI(),
    ...CX,
  })
  await eth.sendTransaction({
    to: erc721Proxy.options.address,
    from: eth.defaultAccount,
    data: erc721Proxy.methods.addAuthorizedAddress(exchange.options.address).encodeABI(),
    ...CX,
  })

  return [exchange, erc20Proxy, erc721Proxy]
}

const deployRequirementFilter = async (exchange) => {
  requirementFilterDeployer.arguments = [exchange.options.address]
  return requirementFilterDeployer.send({ from: eth.defaultAccount, ...CX })
}

module.exports = {
  deployERC20,
  deployERC721,
  deployProtocol,
  deployRequirementFilter,
}