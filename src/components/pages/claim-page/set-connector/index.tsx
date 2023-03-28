import { FC, useEffect } from 'react'
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
import { TDropType } from 'types'
import { plausibleApi } from 'data/api'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, campaignId },
  user: { address }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  address,
  campaignId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('choose_wallet')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineTokenId = (type: TDropType | null, tokenId?: string | null) => {
  if (type === 'ERC20' || !tokenId) { return '' }
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
  address,
  type,
  campaignId
}) => {

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === "injected")
  const system = defineSystem()

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claimpage_open',
      data: {
        campaignId: campaignId as string,
        status: 'loaded'
      }
    })
  }, [])

  return <Container> 
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(type, tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      {type === 'ERC20' ? 'Please proceed to receive tokens' : 'Here is a preview of the NFT you’re about to receive'}
    </TextComponent>
    <ScreenButton onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'claimpage_click',
        data: {
          campaignId: campaignId as string
        }
      })
      if (!address && injected && injected.ready && system !== 'desktop' && injected.name !== 'Brave Wallet') {
        return connect({ connector: injected })
      }
      chooseWallet()
    }}>
      Claim
    </ScreenButton>
    <PoweredBy href='https://linkdrop.io' target='_blank'>
      Powered by
      <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
    </PoweredBy>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)