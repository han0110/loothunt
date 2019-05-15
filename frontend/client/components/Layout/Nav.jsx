import React from 'react'
import Link from 'next/link'
// Components
import Logo from '../Common/Logo'
import Wallet from './Wallet'
// Styles, Assets
import s from './Nav.sass'

const Nav = ({ enable, selectedAddress }) => (
  <>
    <header className={s.container}>
      <Link href="/">
        <Logo className={s.logo} />
      </Link>
      <Wallet enable={enable} selectedAddress={selectedAddress} />
    </header>
    <div className={s.dummy} />
  </>
)

export default Nav
