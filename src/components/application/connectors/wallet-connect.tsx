import { createAppKit } from '@reown/appkit/react'
import { coinbaseWallet } from './coinbase-wallet-wagmi-connector'
import { WagmiProvider } from 'wagmi'
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
  ssr: true,
  connectors: [
    coinbaseWallet({
      appName: 'Claim App'
    })
  ]
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  // @ts-ignore
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})


export {
  wagmiAdapter,
  queryClient
}