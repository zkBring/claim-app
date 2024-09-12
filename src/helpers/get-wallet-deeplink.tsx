import { TSystem, TWalletName } from 'types'
import wallets from 'configs/wallets'

type TGetWalletDeeplink = (walletId: TWalletName, system: TSystem, redirectUrl: string, linkChainId: number | null) => string | void | null

const getWalletDeeplink: TGetWalletDeeplink = (
  walletId,
  system,
  redirectUrl,
  linkChainId
) => {
  const walletData = wallets[walletId]

  if (system === 'desktop') {
    if (walletId === 'okx_wallet') {
      if (walletData) {
        const deeplinkData = walletData.mobile.ios
        if (deeplinkData && deeplinkData.support && deeplinkData.deepLink) {
          const link = deeplinkData.deepLink(redirectUrl)
          return link
        }
      }
    } 
    return 
  }
  if (!walletData) {
    return
  }
  if (linkChainId && !walletData.chains.find(chain => chain === linkChainId)) {
    return
  }

  if (walletData) {
    const deeplinkData = walletData.mobile[system]
    if (deeplinkData && deeplinkData.support && deeplinkData.deepLink) {
      const link = deeplinkData.deepLink(redirectUrl)
      return link
    }
  }
}

export default getWalletDeeplink