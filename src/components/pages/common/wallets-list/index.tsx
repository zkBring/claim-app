import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  Container,
  TextComponent,
  OptionsListStyled,
  WalletIcon,
  ImageContainer
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import MetamaskIcon from 'images/metamask-wallet.png'
import TrustWalletIcon from 'images/trust-wallet.png'
import CoinabseWalletIcon from 'images/coinbase-wallet.png'
import ZerionWalletIcon from 'images/zerion-wallet.png'
import LedgerLiveWalletIcon from 'images/ledgerlive-wallet.png'
import RainbowWalletIcon from 'images/rainbow-wallet.png'
import ImtokenWalletIcon from 'images/imtoken-wallet.png'
import Wallet1inch from 'images/wallet-1inch.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect } from 'wagmi'
import {
  TDropStep,
  TMultiscanStep,
  TWalletName,
  TDropType,
  TSystem
} from 'types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'

import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import {
  defineSystem,
  getWalletOption,
  getInjectedWalletOption
} from 'helpers'
import BrowserWalletIcon from 'images/browser-wallet.png'
import TProps from './types'
import Icons from 'icons'

const mapStateToProps = ({
  token: {
    name,
    image
  },
  drop: { 
    type,
    wallet,
    claimCode,
    chainId,
    isManual,
    campaignId,
    preferredWalletOn,
  }
}: RootState) => ({
  name,
  image,
  type,
  wallet,
  claimCode,
  chainId,
  isManual,
  campaignId,
  preferredWalletOn
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName,
      redirectCallback: () => void
    ) => dispatch(dropAsyncActions.deeplinkRedirect(
      deeplink,
      walletId,
      redirectCallback
    )),
    setAutoclaim: (
      autoclaim: boolean
    ) => {
      dispatch(dropActions.setAutoclaim(autoclaim))
    }
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> & TProps

const defineOption = (
  wallet: TWalletName | null,
  system: TSystem,
  metamaskOption: any, // connector
  coinbaseOption: any, // connector
  zerionOption: any, // redirect
  wallet1InchOption: any, // deeplink
  manualAddressOption: any, // redirect
  imtokenOption: any, // deeplink
  trustOption: any, // deeplink
  rainbowOption: any, // deeplink
  ledgerOption: any // redirect
) => {
  switch (system) {
    case 'desktop': {
      switch (wallet) {
        case 'metamask':
          return metamaskOption
        case 'coinbase_smart_wallet':
          return coinbaseOption
        case 'ledger':
          return ledgerOption
        case 'wallet_1inch':
          return wallet1InchOption
        default:
          return coinbaseOption
      }
    }


    case 'android':
    case 'ios':
    default: {
      switch (wallet) {
        case 'metamask':
          return metamaskOption
        case 'coinbase_smart_wallet':
          return coinbaseOption
        case 'zerion':
          return zerionOption
        case 'imtoken':
          return imtokenOption
        case 'trust':
          return trustOption
        case 'rainbow':
          return rainbowOption
        case 'ledger':
          return ledgerOption
        case 'wallet_1inch':
          return wallet1InchOption
        
        default:
          return coinbaseOption
      }
    }



  }

}

const defineOptionsList = (
  type: TDropType | null,
  setStep: (step: TDropStep & TMultiscanStep) => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: any,
  connectors: any,
  wallet: TWalletName | null,
  deeplinkRedirect: (
    deeplink: string,
    walletId: TWalletName
  ) => Promise<void>,
  isManual: boolean,
  chainId: number,
  claimCode: string,
  enableENS?: boolean,
  enableZerion?: boolean,
  preferredWalletOn?: boolean
) => {

  const allWalletsOption = {
    title: 'I already have a wallet',
    onClick: () => {
      open()
    }
  }

  if (!preferredWalletOn) {
    // @ts-ignore
    const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
    const coinbaseOption = {
      title: 'Create a smart wallet',
      onClick: () => {
        if (!coinbaseConnector) {
          return alert('Cannot connect to Coinbase connector')
        }
        connect({ connector: coinbaseConnector })
      },
      icon: <WalletIcon src={CoinabseWalletIcon} />
    }

    // if no preferred wallet chosen
    return [
      coinbaseOption,
      allWalletsOption
    ]
  }

  const system = defineSystem()

// @ts-ignore
  const injected = connectors.find(connector => connector.id === "injected")
  const injectedOption = getInjectedWalletOption(
    wallet,
    system,
    () => {
      setStep('download_await')
    },
    connect,
    <WalletIcon src={BrowserWalletIcon} />,
    injected
  )

  const ledgerOption = {
    title: 'LedgerLive',
    onClick: async () => {
      setStep('ledger_connection')
    },
    icon: <WalletIcon src={LedgerLiveWalletIcon} />,
  }

  // @ts-ignore
  const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
  const coinbaseOption = {
    title: 'Create a smart wallet',
    onClick: () => {
      if (!coinbaseConnector) {
        return alert('Cannot connect to Coinbase connector')
      }
      connect({ connector: coinbaseConnector })
    },
    icon: <WalletIcon src={CoinabseWalletIcon} />
  }

  const ensOption = !isManual && enableENS ? {
    title: 'ENS or address',
    onClick: () => {
      setStep('set_address')
    },
    icon: <WalletIcon src={ENSIcon} />
  } : undefined

  const injectedOptionIsBrave = injected && injected.name === 'Brave Wallet'

  const wallet1InchOption = getWalletOption(
    'wallet_1inch',
    '1inch',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={Wallet1inch} />,
    deeplinkRedirect,
    claimCode,
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
    claimCode,
    wallet
  )

  const zerionOption = ((injectedOption && !injectedOptionIsBrave) || isManual || !enableZerion) ? undefined : {
    title: 'Zerion',
    onClick: async () => {
      setStep('zerion_connection')
    },
    icon: <WalletIcon src={ZerionWalletIcon} />
  }

  const rainbowOption = (injectedOption && !injectedOptionIsBrave) ? undefined : getWalletOption(
    'rainbow',
    'Rainbow',
    system,
    window.location.href, 
    chainId,
    <WalletIcon src={RainbowWalletIcon} />,
    deeplinkRedirect,
    claimCode,
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
    claimCode,
    wallet
  )

  const primaryOption = defineOption(
    wallet,
    system,
    injectedOption,
    coinbaseOption,
    zerionOption,
    wallet1InchOption,
    ensOption,
    imtokenOption,
    trustOption,
    rainbowOption,
    ledgerOption
  )

  const wallets = [
    primaryOption,
    allWalletsOption
  ]

  return wallets
}

const WalletsList: FC<ReduxType> = ({
  setStep,
  wallet,
  chainId,
  claimCode,
  isManual,
  deeplinkRedirect,
  enableENS,
  enableZerion,
  type,
  preferredWalletOn,
  setAutoclaim
}) => {
  const { open } = useWeb3Modal()
  // const open =  async () => alert('sss')
  const { connect, connectors } = useConnect()

  useEffect(() => {
    setAutoclaim(true)
  }, [])
  const options = defineOptionsList(
    type,
    setStep,
    open,
    connect,
    connectors,
    wallet,
    (deeplink: string, walletId: TWalletName) => deeplinkRedirect(deeplink, walletId, () => setStep('wallet_redirect_await')),
    isManual,
    chainId as number,
    claimCode as string,
    enableENS,
    enableZerion,
    preferredWalletOn
  )

  return <Container>
    <TitleComponent>Connect a wallet</TitleComponent>
    <TextComponent>
      Select an existing crypto wallet or create a new one to proceed with your claim
    </TextComponent>
    <ImageContainer>
      <Icons.WalletImageIcon />
    </ImageContainer>
    <OptionsListStyled options={options} />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(WalletsList)