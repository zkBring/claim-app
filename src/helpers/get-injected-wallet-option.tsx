import { TSystem, TWalletOption } from 'types'
import { detect } from 'detect-browser'
import { Connector } from 'wagmi'

type TDefineInjectedWallet = (
  wallet: string | null,
  system: TSystem,
  downloadStarted: () => void,
  connect: (args: Partial<any> | undefined) => void,
  WalletIcon: JSX.Element,
  injected?: Connector<any, any, any>
) => TWalletOption | undefined

const defineInjectedWallet: TDefineInjectedWallet = (
  wallet,
  system,
  downloadStarted,
  connect,
  walletIcon,
  injected
) => {
  const browser = detect()
  const installMetamask = {
    title: 'Browser Wallet',
    onClick: () => {
      window.open('https://metamask.io/download/', '_blank')
      downloadStarted()
    },
    icon: walletIcon,
    tag: 'Install MetaMask ->'
  }

  if (system === 'desktop') {
    if (
      !injected || !injected.ready
    ) {
      // has no injected
  
      if (wallet !== 'coinbase_wallet') {
        return installMetamask
      } else {
        return undefined
      }
    }
  
    // has injected
  
    if (browser?.name === 'safari') {
      return undefined
    }
  
    if (injected.ready) {
      return {
        title: 'Browser Wallet',
        onClick: () => {
          if (!injected) {
            return alert('Cannot connect to injected')
          }
          connect({ connector: injected })
        },
        icon: walletIcon,
        recommended: wallet !== 'walletconnect' && wallet !== 'coinbase_wallet'
      }
    }
    
    return undefined
  }

  if (injected && injected.ready) { // mobile
    return {
      title: 'Injected',
      onClick: () => {
        if (!injected) {
          return alert('Cannot connect to injected')
        }
        connect({ connector: injected })
      },
      icon: walletIcon,
      recommended: wallet !== 'walletconnect' && wallet !== 'coinbase_wallet' 
    }
  }

  return undefined 
}

export default defineInjectedWallet