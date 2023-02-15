import { initializeConnector } from '@web3-react/core'
import { WalletConnect } from '@web3-react/walletconnect'
import { getHashVariables } from 'helpers'
import { MAINNET_CHAINS } from './chains'

const { chainId = 4 } = getHashVariables()

export const URLS = Object.keys(MAINNET_CHAINS).reduce<Record<number, any>>(
  (accumulator, chainId) => {
    const validURLs = MAINNET_CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)

const [
  walletConnect, hooks
] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        // projectId: process.env.walletConnectProjectId,
        // chains: Object.keys(MAINNET_CHAINS).map(Number),
        rpc: URLS
      },
      defaultChainId: Number(chainId)
    })
)

export {
  walletConnect, hooks
}