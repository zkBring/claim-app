import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  Terms,
  TermsLink
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineSystem } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type },
  user: { address }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  address
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('choose_wallet')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineTokenId = (tokenId?: string | null) => {
  if (!tokenId) { return '' }
  if (tokenId.length > 5) {
    return ` #${shortenString(tokenId, 3)}`
  }
  return ` #${tokenId}`
}

const SetConnector: FC<ReduxType> = ({
  name,
  tokenId,
  image,
  chooseWallet,
  address
}) => {

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === "injected")
  const system = defineSystem()

  return <Container> 
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive
    </TextComponent>
    <ScreenButton onClick={() => {
      if (!address && injected && injected.ready && system !== 'desktop') {
        alert(JSON.stringify(injected, null, 4))
        return connect({ connector: injected })
      }
      chooseWallet()
    }}>
      Connect Wallet
    </ScreenButton>
    <Terms>By claiming NFT you agree to <TermsLink target="_blank" href="https://www.notion.so/Terms-and-Privacy-dfa7d9b85698491d9926cbfe3c9a0a58">Terms and Conditions</TermsLink></Terms>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)