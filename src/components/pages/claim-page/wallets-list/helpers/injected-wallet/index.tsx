import { TSystem, TWalletOption } from 'types'
import { detect } from 'detect-browser'
import {
  WalletIcon,
} from '../../styled-components'
import BrowserWalletIcon from 'images/browser-wallet.png'
import { Connector } from 'wagmi'

type TDefineInjectedWallet = (
  wallet: string | null,
  system: TSystem,
  downloadStarted: () => void,
  connect: (args: Partial<any> | undefined) => void,
  injected?: Connector<any, any, any>
) => TWalletOption | undefined

const defineInjectedWallet: TDefineInjectedWallet = (
  wallet,
  system,
  downloadStarted,
  connect,
  injected
) => {
  const browser = detect()
  const installMetamask = {
    title: 'Browser Wallet',
    onClick: () => {
      window.open('https://metamask.io/download/', '_blank')
      downloadStarted()
    },
    icon: <WalletIcon src={BrowserWalletIcon} />,
    tag: 'Install MetaMask ->'
  }

  if (system === 'desktop') {
    if (
      !injected
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
        icon: <WalletIcon src={BrowserWalletIcon} />,
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
      icon: <WalletIcon src={BrowserWalletIcon} />,
      recommended: wallet !== 'walletconnect' && wallet !== 'coinbase_wallet' 
    }
  }

  return undefined 
}

export default defineInjectedWallet