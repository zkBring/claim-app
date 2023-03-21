import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  PoweredBy,
  PoweredByImage
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineSystem } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import LinkdropLogo from 'images/linkdrop-header.png'

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
      if (!address && injected && injected.ready && system !== 'desktop' && injected.name !== 'Brave Wallet') {
        return connect({ connector: injected })
      }
      chooseWallet()
    }}>
      Connect Wallet
    </ScreenButton>
    <PoweredBy href='https://linkdrop.io' target='_blank'>
      Powered by
      <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
    </PoweredBy>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)