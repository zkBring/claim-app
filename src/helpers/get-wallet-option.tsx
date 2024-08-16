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
  linkCode: string,
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
  linkCode,
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
    icon
  }
}

export default getWalletOption