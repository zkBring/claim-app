import { TSystem, TWalletName } from 'types'
import wallets from 'configs/wallets'

type TGetWalletDeeplink = (walletId: TWalletName, system: TSystem, redirectUrl: string) => string | void | null

const getWalletDeeplink: TGetWalletDeeplink = (walletId, system, redirectUrl) => {
  if (system === 'desktop') {
    return
  }
  const walletData = wallets[walletId]

  if (walletData) {
    const deeplinkData = walletData.mobile[system]
    if (deeplinkData && deeplinkData.support) {
      const link = deeplinkData.deepLink(redirectUrl)
      alert(link)
      return link
    }
  }
}

export default getWalletDeeplink