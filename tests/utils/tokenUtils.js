/* eslint-disable no-await-in-loop */
const { hexToNumber, toChecksumAddress } = require('web3-utils')
const eth = require('./eth')
const { CX, MAX_UINT256 } = require('./constants')

const transferERC20Token = async (argss) => {
  for (let i = 0, l = argss.length; i < l; i += 1) {
    const [erc20Token, ...args] = argss[i]
    await eth.sendTransaction({
      from: eth.defaultAccount,
      to: erc20Token.options.address,
      data: erc20Token.methods.transfer(...args).encodeABI(),
      ...CX,
    })
  }
}

const mintERC721Token = async (argss) => {
  for (let i = 0, l = argss.length; i < l; i += 1) {
    const [erc721Token, ...args] = argss[i]
    await eth.sendTransaction({
      from: eth.defaultAccount,
      to: erc721Token.options.address,
      data: erc721Token.methods.mint(...args).encodeABI(),
      ...CX,
    })
  }
}

const approveERC20 = async (erc20Proxy, erc20Tokens, owner) => {
  for (let i = 0, l = erc20Tokens.length; i < l; i += 1) {
    const erc20Token = erc20Tokens[i]
    await eth.sendTransaction({
      from: owner,
      to: erc20Token.options.address,
      data: erc20Token.methods.approve(erc20Proxy.options.address, MAX_UINT256).encodeABI(),
      ...CX,
    })
  }
}

const approveERC721 = async (erc721Proxy, erc721Tokens, owner) => {
  for (let i = 0, l = erc721Tokens.length; i < l; i += 1) {
    const erc721Token = erc721Tokens[i]
    await eth.sendTransaction({
      from: owner,
      to: erc721Token.options.address,
      data: erc721Token.methods.setApprovalForAll(erc721Proxy.options.address, true).encodeABI(),
      ...CX,
    })
  }
}

const getBalances = async (tokens, ownerAddresses) => {
  const balances = {}

  const allBalances = await Promise.all(tokens.reduce((prev, token) => (
    prev.concat(ownerAddresses.map(ownerAddress => (
      eth.call({
        to: token.options.address,
        data: token.methods.balanceOf(ownerAddress).encodeABI(),
      })
    )))
  ), []))

  for (let i = 0, l = tokens.length; i < l; i += 1) {
    for (let p = 0, q = ownerAddresses.length; p < q; p += 1) {
      if (!balances[tokens[i].options.address]) {
        balances[tokens[i].options.address] = {}
      }
      balances[tokens[i].options.address][ownerAddresses[p]] = hexToNumber(allBalances[i * q + p])
    }
  }

  return balances
}

const getAssetsOwner = async (erc721TokensWithTokenIds) => {
  const assetsOwner = {}

  const allAssetsOwner = await Promise.all(erc721TokensWithTokenIds.reduce((prev, [erc721Token, tokenIds]) => (
    prev.concat(tokenIds.map(tokenId => (
      eth.call({
        to: erc721Token.options.address,
        data: erc721Token.methods.ownerOf(tokenId).encodeABI(),
      })
    )))
  ), []))

  for (let i = 0, l = erc721TokensWithTokenIds.length; i < l; i += 1) {
    const [erc721Token, tokenIds] = erc721TokensWithTokenIds[i]
    for (let p = 0, q = tokenIds.length; p < q; p += 1) {
      if (!assetsOwner[erc721Token.options.address]) {
        assetsOwner[erc721Token.options.address] = {}
      }
      assetsOwner[erc721Token.options.address][tokenIds[p]] = toChecksumAddress(allAssetsOwner[i * q + p].substr(26, 40))
    }
  }

  return assetsOwner
}

module.exports = {
  transferERC20Token,
  mintERC721Token,
  approveERC20,
  approveERC721,
  getBalances,
  getAssetsOwner,
}