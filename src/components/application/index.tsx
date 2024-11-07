import { Provider } from 'react-redux'
import RouterProvider from './router-provider'
import store from 'data/store'
import { Container } from './styled-components'
import { queryClient, wagmiAdapter } from './connectors/wallet-connect'
import { QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { useEffect, useState } from 'react'
import { Loader } from 'components/common'

function Application () {
  return <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <Container>
        <Provider store={store}>
          <RouterProvider />
        </Provider>
      </Container>
    </QueryClientProvider>
  </WagmiProvider>
}

export default Application
