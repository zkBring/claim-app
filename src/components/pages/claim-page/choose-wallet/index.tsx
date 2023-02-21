import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { walletConnect } from 'components/application/connectors/wallet-connect'
import WalletsImg from 'images/wallets.png'
import { Popup, Note } from 'components/common'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ChooseWallet: FC<ReduxType> = () => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim an NFT, you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton onClick={async () => {
      walletConnect.activate()
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
    />}
  </Container>
}

export default connect(mapStateToProps)(ChooseWallet)