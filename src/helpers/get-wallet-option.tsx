import { TSystem, TWalletName, TWalletOption } from 'types'
import getWalletDeeplink from './get-wallet-deeplink'

type TGetgetWalletOption = (
  walletId: TWalletName,
  walletName: string,
  system: TSystem,
  redirectUrl: string, 
  linkChainId: number | null,
  icon: JSX.Element,
  deeplinkRedirect: (deeplink: string, walletId: TWalletName) => Promise<void>,
  preferedWallet?: string | null,
) => TWalletOption | undefined

const getWalletOption: TGetgetWalletOption = (
  walletId,
  walletName,
  system, 
  redirectUrl,
  linkChainId,
  icon,
  deeplinkRedirect,
  preferedWallet
) => {
  const deeplink = getWalletDeeplink(walletId, system, redirectUrl, linkChainId)
  if (!deeplink) {
    return undefined
  }
  return {
    title: walletName,
    onClick: () => {
      deeplinkRedirect(deeplink, walletId)
    },
    icon,
    recommended: preferedWallet === walletId
  }
}

export default getWalletOption