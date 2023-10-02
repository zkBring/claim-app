import { mainnet, polygon, goerli, polygonMumbai, base, baseGoerli } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
const { REACT_APP_JSON_RPC_POLYGON } = process.env

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains: [mainnet, polygon, goerli, polygonMumbai, base, baseGoerli],
  options: {
    appName: 'Linkdrop Claim App',
    jsonRpcUrl: REACT_APP_JSON_RPC_POLYGON as string,
    darkMode: true
  },
})
