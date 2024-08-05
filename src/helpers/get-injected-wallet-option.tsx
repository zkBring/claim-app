import { TSystem, TWalletName, TWalletOption } from 'types'
import { detect } from 'detect-browser'

type TDefineInjectedWallet = (
  wallet: TWalletName | null,
  system: TSystem,
  downloadStarted: (() => void) | null,
  connect: (args: Partial<any> | undefined) => void,
  WalletIcon: JSX.Element,
  injected?:any
) => TWalletOption | undefined

const getInjectedWalletOption: TDefineInjectedWallet = (
  wallet,
  system,
  downloadStarted,
  connect,
  walletIcon,
  injected
) => {
  const browser = detect()
  const installMetamask = {
    title: 'Metamask',
    onClick: () => {
      window.open('https://metamask.io/download/', '_blank')
      downloadStarted && downloadStarted()
    },
    icon: walletIcon,
    tag: 'Install MetaMask ->'
  }

  if (system === 'desktop') {
    if (
      !injected || !window.ethereum
    ) {
      // has no injected
  
      if (wallet !== 'coinbase_smart_wallet') {
        return installMetamask
      } else {
        return undefined
      }
    }
  
    // has injected
  
    if (browser?.name === 'safari') {
      return undefined
    }

    if (window.ethereum) {
      return {
        title: 'Metamask',
        onClick: () => {
          if (!injected) {
            return alert('Cannot connect to injected')
          }
          connect({ connector: injected })
        },
        icon: walletIcon
      }
    }
  
    return undefined

  }

  if (injected && window.ethereum) { // mobile
    return {
      title: 'Injected',
      onClick: () => {
        if (!injected) {
          return alert('Cannot connect to injected')
        }
        connect({ connector: injected })
      },
      icon: walletIcon
    }
  }

  return undefined 
}

export default getInjectedWalletOption