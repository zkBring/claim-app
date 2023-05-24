import { FC, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  LinkButton
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from "@web3modal/react"
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import ZerionWalletIcon from 'images/zerion-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect, Connector } from 'wagmi'
import { TDropStep, TWalletName, TWalletOption } from 'types'
import { AdditionalNoteComponent } from 'linkdrop-ui'
import {  OverlayScreen } from 'linkdrop-ui'
import * as dropActions from 'data/store/reducers/drop/actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupWalletListContents, PopupWhatIsWalletContents } from 'components/pages/common'
import { defineSystem, sortWallets, getWalletOption, getInjectedWalletOption } from 'helpers'
import { plausibleApi } from 'data/api'
import LinkdropLogo from 'images/linkdrop-header.png'
import BrowserWalletIcon from 'images/browser-wallet.png'

const mapStateToProps = ({
  token: {
    name,
    image
  },
  drop: { 
    tokenId,
    type,
    wallet,
    claimCode,
    chainId,
    isManual,
    campaignId,
    onlyPreferredWallet
  }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  wallet,
  claimCode,
  chainId,
  isManual,
  campaignId,
  onlyPreferredWallet
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setAddress: () => dispatch(dropActions.setStep('set_address')),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step)),
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName
    ) => dispatch(dropAsyncActions.deeplinkRedirect(deeplink, walletId)),
    updateUserData: (
      address: string,
      chainId: number
    ) => dispatch(userAsyncActions.updateUserData(address, chainId))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const isOptionVisible = (
  option: TWalletOption | undefined,
  preferredWallet: string | null,
  currentOption: string,
  onlyPreferredWallet: boolean
) => {
  if (!option) { return option }
  if (!onlyPreferredWallet || currentOption === preferredWallet) {
    return option
  }
}

const defineOptionsList = (
  setAddress: () => void,
  setStep: (step: TDropStep) => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: (args: Partial<any> | undefined) => void,
  connectors: Connector<any, any, any>[],
  wallet: string | null,
  downloadStarted: () => void,
  deeplinkRedirect: (
    deeplink: string,
    walletId: TWalletName
  ) => Promise<void>,
  isManual: boolean,
  chainId: number,
  onlyPreferredWallet: boolean
) => {

  const system = defineSystem()
  const ensOption = !isManual ? {
    title: 'Enter ENS or address',
    onClick: setAddress,
    icon: <WalletIcon src={ENSIcon} />
  } : undefined

  const walletConnectOption = {
    title: 'WalletConnect',
    onClick: () => {
      open()
    },
    icon: <WalletIcon src={WalletConnectIcon} />,
    recommended: wallet === 'walletconnect'
  }
  const injected = connectors.find(connector => connector.id === "injected")
  const injectedOption = getInjectedWalletOption(
    wallet,
    system,
    downloadStarted,
    connect,
    <WalletIcon src={BrowserWalletIcon} />,
    injected
  )

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
      isOptionVisible(injectedOption, wallet, 'metamask', onlyPreferredWallet),
      isOptionVisible(coinbaseOption, wallet, 'coinbase_wallet', onlyPreferredWallet),
      isOptionVisible(walletConnectOption, wallet, 'walletconnect', onlyPreferredWallet),
      ensOption
    ]

    return sortWallets(wallets) 
  }

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'

  const metamaskOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'metamask',
    'Metamask',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={MetamaskIcon} />,
    deeplinkRedirect,
    wallet
  )

  const trustOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'trust',
    'Trust Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={TrustWalletIcon} />,
    deeplinkRedirect,
    wallet
  )

  const coinbaseOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'coinbase_wallet',
    'Coinbase Wallet',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={CoinabseWalletIcon} />,
    deeplinkRedirect,
    wallet
  )

  const zerionOption = (injectedOption && !injectedOptionIsBrave) || isManual ? undefined : {
    title: 'Zerion',
    onClick: async () => {
      setStep('zerion_connection')
    },
    icon: <WalletIcon src={ZerionWalletIcon} />,
    recommended: wallet === 'zerion'
  }

  const rainbowOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'rainbow',
    'Rainbow',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={RainbowWalletIcon} />,
    deeplinkRedirect,
    wallet
  )

  const imtokenOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'imtoken',
    'ImToken',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={ImtokenWalletIcon} />,
    deeplinkRedirect,
    wallet
  )


  const wallets = [
    isOptionVisible(injectedOption, wallet, 'metamask', onlyPreferredWallet),
    isOptionVisible(metamaskOption, wallet, 'metamask', onlyPreferredWallet),
    isOptionVisible(coinbaseOption, wallet, 'coinbase_wallet', onlyPreferredWallet),
    isOptionVisible(zerionOption, wallet, 'zerion', onlyPreferredWallet),
    isOptionVisible(walletConnectOption, wallet, 'walletconnect', onlyPreferredWallet),
    ensOption,
    isOptionVisible(imtokenOption, wallet, 'imtoken', onlyPreferredWallet),
    isOptionVisible(trustOption, wallet, 'trust', onlyPreferredWallet),
    isOptionVisible(rainbowOption, wallet, 'rainbow', onlyPreferredWallet)
  ]

  return sortWallets(wallets)
}

const WalletsList: FC<ReduxType> = ({
  setAddress,
  setStep,
  wallet,
  chainId,
  isManual,
  campaignId,
  deeplinkRedirect,
  onlyPreferredWallet
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const injected = connectors.find(connector => connector.id === "injected")

  const options = defineOptionsList(
    setAddress,
    setStep,
    open,
    connect,
    connectors,
    wallet,
    () => setStep('download_await'),
    (deeplink: string, walletId: TWalletName) => deeplinkRedirect(deeplink, walletId),
    isManual,
    chainId as number,
    onlyPreferredWallet
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
          campaignId: campaignId as string,
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
            campaignId: campaignId as string,
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

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)