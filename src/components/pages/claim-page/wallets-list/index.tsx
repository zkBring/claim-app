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
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import ENSIcon from 'images/ens-logo.png'
import { useConnect, Connector } from 'wagmi'
import {
  Popup,
  Note
} from 'components/common'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupContents } from './components'
import { defineSystem } from 'helpers'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, wallet }
}: RootState) => ({
  name, image, type, tokenId, wallet
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setAddress: () => dispatch(
      dropActions.setStep('set_address')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineOptionsList = (
  setAddress: () => void,
  open: (options?: any | undefined) => Promise<void>,
  connect: (args: Partial<any> | undefined) => void,
  connectors: Connector<any, any, any>[]
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
    const injectedOption = injected ? {
      title: 'Injected',
      onClick: () => {
        if (!injected) {
          return
        }
        connect({ connector: injected })
      },
      icon: <WalletIcon src={MetamaskIcon} />,
      recommended: true
    } : undefined
    return [
      injectedOption,
      walletConnectOption,
      ensOption
    ]
  }

  const injectedOption = injected ? {
    title: 'Injected',
    onClick: () => {
      if (!injected) {
        return
      }
      connect({ connector: injected })
    },
    icon: <WalletIcon src={MetamaskIcon} />,
    recommended: true
  } : undefined

  return [
    injectedOption,
    walletConnectOption,
    ensOption
  ]
}

const WalletsList: FC<ReduxType> = ({
  setAddress,
  wallet
}) => {
  const { open } = useWeb3Modal()
  const { connect, connectors } = useConnect()

  const options = defineOptionsList(
    setAddress,
    open,
    connect,
    connectors
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