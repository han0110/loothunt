/* eslint-disable class-methods-use-this */
import ethAbi from 'web3-eth-abi'
import ethereumjsAbi from 'ethereumjs-abi'
import { hexToNumber, hexToNumberString } from 'web3-utils'
import BigNumber from 'bignumber.js'
import interfaces from './interfaces'
import { ASSET_DATA_IDS, ASSET_DATA_SELECTORS } from '../constants'

const erc721AssetDataReg = new RegExp(`(^${ASSET_DATA_SELECTORS.ERC721})([0-9a-f]{128}$)`, 'i')
const erc20AssetDataReg = new RegExp(`(^${ASSET_DATA_SELECTORS.ERC20})([0-9a-f]{64}$)`, 'i')
const balanceThresholdReg = new RegExp(`(^${ASSET_DATA_SELECTORS.BALANCE_THRESHOLD})([0-9a-f]+$)`, 'i')
const ownershipReg = new RegExp(`(^${ASSET_DATA_SELECTORS.OWNERSHIP})([0-9a-f]+$)`, 'i')
const filledTimesReg = new RegExp(`(^${ASSET_DATA_SELECTORS.FILLED_TIMES})([0-9a-f]+$)`, 'i')

const encodeFunctionCall = (method, parameters) => 
  ethAbi.encodeFunctionCall(interfaces[method], parameters)

const decodeParameters = (method, data) => {
  const typesArray = interfaces[method].outputs
  try {
    return ethAbi.decodeParameters(typesArray, data)
  } catch (e) {
    return Array(typesArray.length)
  }
}

const simpleEncode = (...args) =>
  `0x${ethereumjsAbi.simpleEncode(...args).toString('hex')}`

const encodeERC20AssetData = contractAddress =>
  simpleEncode(
    ASSET_DATA_IDS.ERC20,
    contractAddress,
  )

const encodeERC721AssetData = (contractAddress, tokenId) =>
  simpleEncode(
    ASSET_DATA_IDS.ERC721,
    contractAddress,
    tokenId,
  )

const encodeRequirementData = (
  requirementFilterAddress,
  requirements = [],
) => {
  let data = encodeERC20AssetData(requirementFilterAddress)
  requirements.forEach(requirement => {
    data += ethereumjsAbi.simpleEncode(requirement.dataId, ...requirement.args).toString('hex')
  })
  return data
}

const decodeMission = (order) => {
  const {
    makerAssetData,
    makerAssetAmount,
    takerAssetData,
    takerAssetAmount,
  } = order

  const filledTimes = {
    type: ASSET_DATA_IDS.FILLED_TIMES,
    amount: 1,
  }

  const requirements = []
  const reward = {
    fillableTimes: hexToNumber(takerAssetAmount),
  }

  let requirementsData
  if (erc20AssetDataReg.test(takerAssetData.substr(0, 74))) {
    requirementsData = `0x${takerAssetData.substr(74)}`
  } else if (erc721AssetDataReg.test(takerAssetData.substr(0, 138))) {
    requirementsData = `0x${takerAssetData.substr(138)}`
  }

  while (requirementsData.length > 2) {
    if (balanceThresholdReg.test(requirementsData)) {
      requirements.push({
        type: ASSET_DATA_IDS.BALANCE_THRESHOLD,
        contractAddress: `0x${requirementsData.substr(34, 40)}`,
        amount: hexToNumberString(`0x${requirementsData.substr(74, 64)}`),
      })
      requirementsData = `0x${requirementsData.substr(138)}`
    } else if (ownershipReg.test(requirementsData)) {
      requirements.push({
        type: ASSET_DATA_IDS.OWNERSHIP,
        contractAddress: `0x${requirementsData.substr(34, 40)}`,
        tokenId: hexToNumberString(`0x${requirementsData.substr(74, 64)}`),
      })
      requirementsData = `0x${requirementsData.substr(138)}`
    } else if (filledTimesReg.test(requirementsData)) {
      filledTimes.amount = hexToNumberString(`0x${requirementsData.substr(10, 64)}`)
      requirementsData = hexToNumberString(`0x${requirementsData.substr(74)}`)
    } else {
      requirementsData = '0x'
    }
  }

  requirements.push(filledTimes)

  if (erc20AssetDataReg.test(makerAssetData)) {
    Object.assign(reward, {
      type: ASSET_DATA_IDS.ERC20,
      contractAddress: `0x${makerAssetData.substr(34, 40)}`,
      amount: new BigNumber(makerAssetAmount).div(new BigNumber(takerAssetAmount)).toString(),
    })
  } else if (erc721AssetDataReg.test(makerAssetData)) {
    Object.assign(reward, {
      type: ASSET_DATA_IDS.ERC721,
      contractAddress: `0x${makerAssetData.substr(34, 40)}`,
      tokenId: hexToNumberString(`0x${makerAssetData.substr(74, 64)}`),
    })
  }

  return { requirements, reward }
}

export default {
  encodeFunctionCall,
  decodeParameters,
  encodeERC20AssetData,
  encodeERC721AssetData,
  encodeRequirementData,
  decodeMission,
}