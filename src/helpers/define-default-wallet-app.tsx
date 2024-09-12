import defineNetworkName from './define-network-name'
import chains from 'configs/chains'
import { TWalletName } from 'types'

type TDefineDefaultWalletApp = (chainId: number) => TWalletName

const defineDefaultWalletApp: TDefineDefaultWalletApp = (chainId) => {
  const chainConfig =  chains[chainId]
  if (chainConfig) {
    const { defaultWalletApp } = chainConfig
    if (defaultWalletApp) {
      return defaultWalletApp
    }
  }
  return 'coinbase_smart_wallet'
}

export default defineDefaultWalletApp