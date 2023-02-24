import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
// import { walletConnect } from 'components/application/connectors/wallet-connect'
// walletConnect.activate()
import WalletsImg from 'images/wallets.png'
import { Popup, Note, PopupParagraph, PopupSubtitle } from 'components/common'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('wallets_list')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ChooseWallet: FC<ReduxType> = ({
  chooseWallet
}) => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim an NFT, you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton onClick={async () => {
      chooseWallet()
    }}>
      Choose wallet
    </ScreenButton>
    <Note
      text='What is a Wallet?'
      position='bottom'
      onClick={() => { setShowPopup(true) }}
    />
    {showPopup && <Popup
      title='What is a Wallet?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupParagraph>
        A crypto wallet is needed to store and manage cryptocurrency in a secure and convenient way. It allows users to view their balance, send and receive cryptocurrency, and track their transaction history. In addition, many crypto wallets allow users to connect their wallet to decentralized applications (dApps) and use their cryptocurrency to interact with the dApps in various ways.
      </PopupParagraph>
      <PopupSubtitle>A Home for your Digital Assets</PopupSubtitle>
      <PopupParagraph>
        Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs
      </PopupParagraph>
      <PopupSubtitle>A New Way to Log In</PopupSubtitle>
      <PopupParagraph>
        Instead of creating new accounts and passwords on every website, just connect your wallet
      </PopupParagraph>
    </Popup>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)