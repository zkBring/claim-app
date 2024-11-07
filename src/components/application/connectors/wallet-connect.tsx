import { createAppKit } from '@reown/appkit/react'
// import { coinbaseWallet } from './coinbase-wallet-wagmi-connector'
import { WagmiProvider } from 'wagmi'
import { coinbaseWallet } from 'wagmi/connectors'

import {
  polygon,
  immutableZkEvm,
  xLayer,
  mainnet,
  base
} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com

const { REACT_APP_WC_PROJECT_ID } = process.env
const projectId = REACT_APP_WC_PROJECT_ID as string

// 2. Create wagmiConfig
const metadata = {
  name: 'Linkdrop Claim App',
  description: 'Linkdrop Claim App',
  url: 'https://linkdrop.io', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const networks = [
  base,
  mainnet,
  polygon,
  immutableZkEvm,
  xLayer
]


// @ts-ignore
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  connectors: [
    coinbaseWallet()
  ],
})

// 5. Create modal
createAppKit({
  adapters: [
    wagmiAdapter
  ],
  featuredWalletIds: ['fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'],
  // @ts-ignore
  networks,
  projectId,
  metadata
})


export {
  wagmiAdapter,
  queryClient
}