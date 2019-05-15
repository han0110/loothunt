import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
// Styles
import '../styles/style.sass'
// Utils
import eth from '../eth'
import { NULL_ADDRESS } from '../utils/constants'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {

    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { initialProps }
  }

  constructor(props) {
    super(props)
    this.state = {
      enable: false,
      selectedAddress: NULL_ADDRESS,
      balance: 0,
    }
  }

  async componentDidMount() {
    if (await eth.findProviderAndSet()) {
      const { selectedAddress } = eth.getProviderState()
      const balance = await eth.getSelectedBalance()
      this.setState({ enable: true, selectedAddress, balance })

      eth.currentProvider.on('accountsChanged', async ([newSelectedAddress]) => {
        this.setState({ selectedAddress: newSelectedAddress })
      })
    }
  }

  render() {
    const { Component, initialProps } = this.props

    return (
      <Container>
        <Head>
          <title>LootHunt</title>
        </Head>
        <Component {...initialProps} {...this.state} />
      </Container>
    )
  }
}

export default MyApp
