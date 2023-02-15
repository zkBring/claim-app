import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  AdditionalAction
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { hooks as walletConnectHooks, walletConnect } from 'components/application/connectors/wallet-connect'
import ZerionLogo from 'images/zerion.png'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ChooseWallet: FC<ReduxType> = () => {
  return <Container> 
    <WalletIcon src={ZerionLogo} /> 
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Claim NFT using your Zerion Wallet. Download the app or use another wallet.
    </TextComponent>
    <ScreenButton onClick={() => {
      walletConnect.activate()
    }}>
      Use Zerion
    </ScreenButton>
    <AdditionalAction
      onClick={() => {
        walletConnect.activate()
      }}
    >Choose another wallet</AdditionalAction>
  </Container>
}

export default connect(mapStateToProps)(ChooseWallet)