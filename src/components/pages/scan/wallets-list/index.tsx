import { FC, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  LinkButton
} from './styled-components'
import { IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from "@web3modal/react"
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep, TWalletName } from 'types'
import { AdditionalNoteComponent } from 'linkdrop-ui'
import {  OverlayScreen } from 'linkdrop-ui'
import * as dropActions from 'data/store/reducers/drop/actions'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupWalletListContents, PopupWhatIsWalletContents } from 'components/pages/common'
import { defineSystem, sortWallets, getWalletOption, getInjectedWalletOption } from 'helpers'
import { plausibleApi } from 'data/api'
import LinkdropLogo from 'images/linkdrop-header.png'
import BrowserWalletIcon from 'images/browser-wallet.png'

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step)),
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName
    ) => dispatch(dropAsyncActions.deeplinkRedirect(deeplink, walletId))
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps>

const defineOptionsList = (
  open: (options?: any | undefined) => Promise<void>,
  connectors: Connector<any, any, any>[],
  connect: (args: Partial<any> | undefined) => void,
  wallet: TWalletName,
  deeplinkRedirect: (
    deeplink: string,
    walletId: TWalletName
  ) => Promise<void>,
) => {
  const system = defineSystem()

  const injected = connectors.find(connector => connector.id === "injected")
  const injectedOption = getInjectedWalletOption(
    wallet,
    system,
    null,
    connect,
    <WalletIcon src={BrowserWalletIcon} />,
    injected
  )

  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />
  }

  if (system === 'desktop') {
    const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWallet")
    const coinbaseOption = {
      title: 'Coinbase Wallet',
      onClick: () => {
        if (!coinbaseConnector) {
          return alert('Cannot connect to Coinbase connector')
        }
        connect({ connector: coinbaseConnector })
      },
      icon: <WalletIcon src={CoinabseWalletIcon} />,
      recommended: wallet === 'coinbase_wallet'
    }

    const wallets = [
      coinbaseOption,
      injectedOption,
      walletConnectOption
    ]
    return sortWallets(wallets) 
  }


  const metamaskOption = getWalletOption(
    'metamask',
    'Metamask',
    system,
    window.location.href, 
    null,
    <WalletIcon src={MetamaskIcon} />,
    deeplinkRedirect
  )

  const trustOption = getWalletOption(
    'trust',
    'Trust Wallet',
    system,
    window.location.href, 
    null,
    <WalletIcon src={TrustWalletIcon} />,
    deeplinkRedirect
  )

  const coinbaseOption = getWalletOption(
    'coinbase_wallet',
    'Coinbase Wallet',
    system,
    window.location.href, 
    null,
    <WalletIcon src={CoinabseWalletIcon} />,
    deeplinkRedirect
  )

  const rainbowOption = getWalletOption(
    'rainbow',
    'Rainbow',
    system,
    window.location.href, 
    null,
    <WalletIcon src={RainbowWalletIcon} />,
    deeplinkRedirect
  )

  const imtokenOption = getWalletOption(
    'imtoken',
    'ImToken',
    system,
    window.location.href, 
    null,
    <WalletIcon src={ImtokenWalletIcon} />,
    deeplinkRedirect
  )

  const wallets = [
    metamaskOption,
    coinbaseOption,
    walletConnectOption,
    imtokenOption,
    trustOption,
    rainbowOption
  ]

  return sortWallets(wallets)
}

const WalletsList: FC<ReduxType> = ({ deeplinkRedirect }) => {
  const { open } = useWeb3Modal()
  const { connectors, connect } = useConnect()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const injected = connectors.find(connector => connector.id === "injected")

  const options = defineOptionsList(
    open,
    connectors,
    connect,
    'coinbase_wallet',
    (deeplink: string, walletId: TWalletName) => deeplinkRedirect(deeplink, walletId),
  )

  return <Container>
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Choose a wallet from the list
    </TextComponent>
    <OptionsListStyled options={options} />
    {system === 'desktop' && !injected && <LinkButton onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'educate_me',
        data: {
          campaignId: 'dispenser',
          screen: 'what_is_a_wallet'
        }
      })
      setShowPopup(true)
    }}>What is browser wallet?</LinkButton>}
    {system !== 'desktop' && <AdditionalNoteComponent
      text='Don’t know what to choose?'
      position='bottom'
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'educate_me',
          data: {
            campaignId: 'dispenser',
            screen: 'what_is_connection'
          }
        })
        setShowPopup(true)
      }}
    />}
    {showPopup && <OverlayScreen
      headerLogo={LinkdropLogo}
      title={system === 'desktop' ? 'What is a Wallet?' : 'Connecting your wallet'}
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      {system === 'desktop' ? <PopupWhatIsWalletContents /> : <PopupWalletListContents />}
    </OverlayScreen>}
  </Container>
}

export default connect(null, mapDispatcherToProps)(WalletsList)