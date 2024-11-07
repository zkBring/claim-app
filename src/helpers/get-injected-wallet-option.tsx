import { TSystem, TWalletName, TWalletOption } from 'types'
import { detect } from 'detect-browser'

type TDefineInjectedWallet = (
  wallet: TWalletName | null,
  system: TSystem,
  downloadStarted: (() => void) | null,
  connect: (args: Partial<any> | undefined) => void,
  WalletIcon: JSX.Element,
  injected?:any,
  title?: string
) => TWalletOption | undefined

const getInjectedWalletOption: TDefineInjectedWallet = (
  wallet,
  system,
  downloadStarted,
  connect,
  walletIcon,
  injected,
  title
) => {
  const browser = detect()
  if (browser?.name === 'safari') {
    return undefined
  }

  const connectToInjected = {
    title: 'Connect wallet',
    onClick: () => {
      if (!injected) {
        return alert('Cannot connect to injected')
      }
      connect({ connector: injected })
    },
    icon: walletIcon
  }

  if (wallet === 'okx_wallet') {
    const installOkx = {
      title: 'Get OKX Wallet',
      onClick: () => {
        window.open('https://www.okx.com/web3', '_blank')
        downloadStarted && downloadStarted()
      },
      icon: walletIcon
    }

    if (system === 'desktop') {
      if (
        // @ts-ignore
        !injected || !window.ethereum
      ) {
        return installOkx
      } else {
        return connectToInjected
      }
    }
  }

  const installMetamask = {
    title: 'Get Metamask',
    onClick: () => {
      window.open('https://metamask.io/download/', '_blank')
      downloadStarted && downloadStarted()
    },
    icon: walletIcon,
    tag: 'Install MetaMask ->'
  }

  if (system === 'desktop') {
    if (
      // @ts-ignore
      !injected || !window.ethereum
    ) {
      // has no injected
  
      if (
        wallet !== 'coinbase_wallet'
      ) {
        return installMetamask
      } else {
        return undefined
      }
    }
  }
  // @ts-ignore
  if (injected && window.ethereum) {
    return connectToInjected
  }

  return undefined 
}

export default getInjectedWalletOption