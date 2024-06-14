import { TSystem, TWalletName, TWalletOption } from 'types'
import getWalletDeeplink from './get-wallet-deeplink'
import { COINBASE_CLAIM_URL } from 'configs/application'

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

  // disable for now
  // if (walletId === 'coinbase_wallet') {
  //   const defineRedirectUrl = COINBASE_CLAIM_URL
  //     .replace('<CODE>', linkCode)
  //     .replace('<CHAIN_ID>', String(linkChainId))
  //     .replace('<VERSION>', '3')
    
  //   return {
  //     title: walletName,
  //     onClick: () => {
  //       deeplinkRedirect(defineRedirectUrl, walletId)
  //     },
  //     icon,
  //     recommended: preferedWallet === walletId
  //   }
  // }

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