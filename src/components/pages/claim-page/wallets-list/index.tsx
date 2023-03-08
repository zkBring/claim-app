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
import OperaWalletIcon from 'images/opera-touch-wallet.png'
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
  claimCode: string | null,
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
    icon: <WalletIcon src={WalletConnectIcon} />
  }
  const injected = connectors.find(connector => connector.id === "injected")

  if (system === 'desktop') {
    const injectedOption = injected && injected.ready ? {
      title: 'Browser Wallet',
      onClick: () => {
        if (!injected) {
          return
        }
        connect({ connector: injected })
      },
      icon: <WalletIcon src={MetamaskIcon} />,
      recommended: true
    } : {
      title: 'Browser Wallet',
      onClick: () => {
        window.open('https://metamask.io/download/', '_blank')
        downloadStarted()
      },
      icon: <WalletIcon src={BrowserWalletIcon} />,
      tag: 'Install MetaMask ->'
    }

    return [
      injectedOption,
      walletConnectOption,
      ensOption
    ]
  }

  const injectedOption = injected && injected.ready ? {
    title: 'Injected',
    onClick: () => {
      if (!injected) {
        return
      }
      connect({ connector: injected })
    },
    icon: <WalletIcon src={BrowserWalletIcon} />,
    recommended: true
  } : undefined

  const metamaskDeeplink = getWalletDeeplink('metamask', system, window.location.href)
  const metamaskOption = injectedOption || !metamaskDeeplink ? undefined : {
    title: 'Metamask',
    onClick: () => {
      window.open(metamaskDeeplink as string)
    },
    icon: <WalletIcon src={MetamaskIcon} />,
    recommended: true
  }

  const operaDeeplink = getWalletDeeplink('opera', system, window.location.href)
  const operaOption = !operaDeeplink ? undefined : {
    title: 'Opera',
    onClick: () => {
      window.open(operaDeeplink as string)
    },
    icon: <WalletIcon src={OperaWalletIcon} />
  }

  const coinbaseDeeplink = getWalletDeeplink('coinbase', system, window.location.href)
  const coinbaseOption = !coinbaseDeeplink ? undefined : {
    title: 'Coinbase',
    onClick: () => {
      window.open(coinbaseDeeplink as string)
    },
    icon: <WalletIcon src={CoinabseWalletIcon} />
  }

  return [
    injectedOption,
    metamaskOption,
    walletConnectOption,
    ensOption,
    coinbaseOption,
    operaOption
  ]
}

const WalletsList: FC<ReduxType> = ({
  setAddress,
  claimCode,
  setStep
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()

  const options = defineOptionsList(
    setAddress,
    open,
    connect,
    connectors,
    claimCode,
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