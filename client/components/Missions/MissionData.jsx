/* eslint-disable no-nested-ternary */
import React from 'react'
// Styles
import s from './MissionData.sass'
// Constants
import { ASSET_DATA_IDS } from '../../utils/constants'
// Assets
import tokens from '../../assets/tokens/tokens.json'

const MissionData = ({ data, fetching, achieved }) => {
  const { type, contractAddress, amount, tokenId } = data
  const token = tokens[contractAddress] || {}

  let missionContent

  if (
    type === ASSET_DATA_IDS.BALANCE_THRESHOLD ||
    type === ASSET_DATA_IDS.ERC20
  ) {
    missionContent = <>
      <div className={s.image}>
        <img src={token.imageUrl} alt="" data-erc20/>
      </div>
      <p className={s.content}>{amount / 10 ** token.decimals || amount} {token.symbol}</p>
    </>
  } else if (
    type === ASSET_DATA_IDS.OWNERSHIP ||
    type === ASSET_DATA_IDS.ERC721
  ) {
    missionContent = <>
      <div className={s.image}>
        <img src={`https://storage.googleapis.com/opensea-prod.appspot.com/${contractAddress}/${tokenId}.${token.imageType}`} alt=""/>
      </div>
      <p className={s.content}># {tokenId}</p>
    </>
  }

  if (missionContent) {
    return <div className={s.container}>
      <div className={s.status}>
        {fetching === true ? <div className={s.spinner} /> : null}
        {fetching === false ? (achieved ? <div className={s.checkmark} /> : <div className={s.crossmark} />) : null}
      </div>
      {missionContent}
    </div>
  }

  return null
}

export default MissionData