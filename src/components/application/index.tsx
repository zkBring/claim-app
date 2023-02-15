import React from 'react'
import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { hooks as metamaskHooks, metamask } from './connectors/metamask-connect'
import { WalletConnect } from '@web3-react/walletconnect'
import { MetaMask } from '@web3-react/metamask'
import { hooks as walletConnectHooks, walletConnect } from './connectors/wallet-connect'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'

const connectors: [ MetaMask | WalletConnect, Web3ReactHooks ][] = [
  [ metamask, metamaskHooks ],
  [ walletConnect, walletConnectHooks ]
]

class Application extends React.Component {
  render () {
    return <Web3ReactProvider connectors={connectors}>
      <Container>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </Container>
    </Web3ReactProvider>
  }
}
export default Application
