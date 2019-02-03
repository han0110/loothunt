import React from 'react'
// Components
import Nav from '../components/Layout/Nav'
// Assets
import s from './Layout.sass'

const Layout = ({ enable, selectedAddress, children }) => (
  <>
    <Nav enable={enable} selectedAddress={selectedAddress} />
    <main className={s['main-container']}>{children}</main>
  </>
)

export default Layout
