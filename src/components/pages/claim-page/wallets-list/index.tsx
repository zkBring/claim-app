import { FC, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from "@web3modal/react"
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'

import BrowserWalletIcon from 'images/browser-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep } from 'types'
import {
  Popup,
  Note
} from 'components/common'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupContents } from './components'
import { defineSystem, getWalletDeeplink } from 'helpers'
import { detect } from 'detect-browser'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, wallet, claimCode }
}: RootState) => ({
  name, image, type, tokenId, wallet, claimCode
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setAddress: () => dispatch(
      dropActions.setStep('set_address')
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineOptionsList = (
  setAddress: () => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: (args: Partial<any> | undefined) => void,
  connectors: Connector<any, any, any>[],
  wallet: string | null,
  downloadStarted: () => void,
) => {
  const system = defineSystem()
  const ensOption = {
    title: 'Enter ENS or address',
    onClick: setAddress,
    icon: <WalletIcon src={ENSIcon} />
  }

  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />,
    recommended: wallet === 'walletconnect'
  }
  const injected = connectors.find(connector => connector.id === "injected")

  if (system === 'desktop') {
    const browser = detect()
    const injectedOption = browser?.name !== 'safari' ? (injected && injected.ready ? {
      title: 'Browser Wallet',
      onClick: () => {
        if (!injected) {
          return
        }
        connect({ connector: injected })
      },
      icon: <WalletIcon src={BrowserWalletIcon} />,
      recommended: wallet && wallet !== 'walletconnect'
    } : {
      title: 'Browser Wallet',
      onClick: () => {
        window.open('https://metamask.io/download/', '_blank')
        downloadStarted()
      },
      icon: <WalletIcon src={BrowserWalletIcon} />,
      tag: 'Install MetaMask ->'
    }) : undefined

    return [
      injectedOption,
      walletConnectOption,
      ensOption
    ]
  }

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'

  const injectedOption = injected && injected.ready ? {
    title: 'Injected',
    onClick: () => {
      if (!injected) {
        return
      }
      connect({ connector: injected })
    },
    icon: <WalletIcon src={BrowserWalletIcon} />,
    recommended: !injectedOptionIsBrave
  } : undefined

  const metamaskDeeplink = getWalletDeeplink('metamask', system, window.location.href)
  const metamaskOption = (injectedOption && !injectedOptionIsBrave) || !metamaskDeeplink ? undefined : {
    title: 'Metamask',
    href: metamaskDeeplink,
    icon: <WalletIcon src={MetamaskIcon} />,
    recommended: wallet === 'metamask'
  }

  const trustDeeplink = getWalletDeeplink('trust', system, window.location.href)
  const trustOption = (injectedOption && !injectedOptionIsBrave) || !trustDeeplink ? undefined : {
    title: 'Trust',
    href: trustDeeplink,
    icon: <WalletIcon src={TrustWalletIcon} />,
    recommended: wallet === 'trust'
  }

  const coinbaseDeeplink = getWalletDeeplink('coinbase', system, window.location.href)
  const coinbaseOption = (injectedOption && !injectedOptionIsBrave) || !coinbaseDeeplink ? undefined : {
    title: 'Coinbase',
    href: coinbaseDeeplink,
    icon: <WalletIcon src={CoinabseWalletIcon} />,
    recommended: wallet === 'coinbase_wallet'
  }

  // const imtokenDeeplink = getWalletDeeplink('imtoken', system, window.location.href)
  // const imtokenOption = (injectedOption && !injectedOptionIsBrave) || !imtokenDeeplink ? undefined : {
  //   title: 'Imtoken',
  //   onClick: () => {
  //     window.open(imtokenDeeplink as string)
  //   },
  //   icon: <WalletIcon src={ImtokenWalletIcon} />,
  //   recommended: wallet === 'imtoken'
  // }

  // const statusDeeplink = getWalletDeeplink('status', system, window.location.href)
  // const statusOption = (injectedOption && !injectedOptionIsBrave) || !statusDeeplink ? undefined : {
  //   title: 'Status',
  //   onClick: () => {
  //     window.open(statusDeeplink as string)
  //   },
  //   icon: <WalletIcon src={StatusWalletIcon} />,
  //   recommended: wallet === 'status'
  // }

  return [
    injectedOption,
    metamaskOption,
    walletConnectOption,
    ensOption,
    // imtokenOption,
    coinbaseOption,
    trustOption,
    // statusOption
  ]
}

const WalletsList: FC<ReduxType> = ({
  setAddress,
  setStep,
  wallet
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()

  const options = defineOptionsList(
    setAddress,
    open,
    connect,
    connectors,
    wallet,
    () => setStep('download_await')
  )

  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container>
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Choose a wallet from the list
    </TextComponent>
    <OptionsListStyled options={options}/>
    <Note
      text='Connect your wallet'
      position='bottom'
      onClick={() => { setShowPopup(true) }}
    />
    {showPopup && <Popup
      title='Don’t know what to choose?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </Popup>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)