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
import { walletConnect } from 'components/application/connectors/wallet-connect'
import { metamask } from 'components/application/connectors/metamask-connect'
import MetamaskIcon from 'images/metamask-wallet.png'
import WalletConnectIcon from 'images/walletconnect-wallet.png'
import ENSIcon from 'images/ens-logo.png'

import {
  Popup,
  Note
} from 'components/common'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupContents } from './components'

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

const WalletsList: FC<ReduxType> = ({
  setAddress,
  wallet
}) => {
  const options = [{
    title: 'Metamask',
    onClick: () => {
      metamask.activate().catch(err => {
        alert('Metamask is not installed!')
      })
    },
    icon: <WalletIcon src={MetamaskIcon} />,
    recommended: true
  }, {
    title: 'WalletConnect',
    onClick: () => {
      walletConnect.activate()
    },
    icon: <WalletIcon src={WalletConnectIcon} />
  }, {
    title: 'Enter ENS or address',
    onClick: setAddress,
    icon: <WalletIcon src={ENSIcon} />
  }]

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