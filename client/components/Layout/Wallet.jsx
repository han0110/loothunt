import React from 'react'
// Components
import JazzIcon, { jsNumberForAddress } from 'react-jazzicon'
// Styles
import s from './Wallet.sass'

const Wallet = ({ enable, selectedAddress }) => {

  return (
    <div className={s.container}>
      <JazzIcon seed={jsNumberForAddress(selectedAddress)} diameter={30} />
      <span className={s.hint}>
        {enable ? (
          selectedAddress.replace(
            selectedAddress.substring(
              6,
              selectedAddress.length - 4,
            ),
            '...',
          )
        ) : '0x0000...0000'}
      </span>
    </div>
  )
}

export default Wallet
