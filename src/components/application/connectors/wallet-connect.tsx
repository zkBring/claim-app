import {
  EthereumClient,
  w3mProvider
} from "@web3modal/ethereum"
import { configureChains, createConfig } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai, base, baseGoerli } from "wagmi/chains"
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { InjectedConnector } from 'wagmi/connectors/injected'

const { REACT_APP_WC_PROJECT_ID } = process.env
const chains = [mainnet, polygon, goerli, polygonMumbai, base, baseGoerli]

// Wagmi client
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId: REACT_APP_WC_PROJECT_ID as string })
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains, options: {
        projectId: REACT_APP_WC_PROJECT_ID as string
      }
    }),
    new InjectedConnector({
      chains
    })
  ],
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export {
  wagmiConfig,
  ethereumClient
}