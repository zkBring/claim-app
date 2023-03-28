import { FC, useEffect } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageLarge,
  TokenImageContainer,
  DoneIcon,
  Container,
  Description
} from './styled-components'
import { defineExplorerURL, defineOpenseaURL } from 'helpers'
import { plausibleApi } from 'data/api'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    tokenId,
    tokenAddress,
    campaignId
  },
  user: {
    address
  },
  token: {
    image,
    name
  }
}: RootState) => ({
  image,
  address,
  name,
  chainId,
  hash,
  tokenId,
  tokenAddress,
  campaignId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const renderWatchTokenButton = (
  tokenId: string | null,
  tokenAddress: string | null,
  chainId: number | null,
  campaignId: string
) => {
  if (!tokenId || !tokenAddress || !chainId) { return null }
  const watchTokenUrl = defineOpenseaURL(
    chainId,
    tokenAddress,
    tokenId
  )
  return <ScreenButton
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_redirect_button',
        data: {
          campaignId: campaignId,
        }
      })
      window.open(watchTokenUrl, '_blank')
    }}
    target="_blank"
  >
    View on OpenSea
  </ScreenButton>
}

const ClaimingFinished: FC<ReduxType> = ({
  image,
  name,
  hash,
  chainId,
  tokenId,
  tokenAddress,
  campaignId
}) => {

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claim_finished',
      data: {
        campaignId: campaignId as string,
      }
    })
  }, [])
  const title = <TitleComponent>Successfully claimed</TitleComponent>
  const explorerUrl = chainId && hash ? <ScreenButton
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_explorer',
        data: {
          campaignId: campaignId as string,
        }
      })
      window.open(`${defineExplorerURL(chainId)}/tx/${hash}`, '_blank')
    }}
    title='View in Explorer'
    appearance='inverted'
  /> : null
  const openseaButton = renderWatchTokenButton(
    tokenId,
    tokenAddress,
    chainId,
    campaignId as string
  )
  return <Container>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
    {title}
    <Description>
      Your NFT will appear in your account in a few minutes
    </Description>
    <ButtonsContainer>
      {openseaButton}
      {explorerUrl}
    </ButtonsContainer>
  </Container>
}

export default connect(mapStateToProps)(ClaimingFinished)