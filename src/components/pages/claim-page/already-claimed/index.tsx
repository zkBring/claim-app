import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineExplorerURL,
  defineOpenseaURL
} from 'helpers'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageLarge,
  TokenImageContainer,
  DoneIcon,
  Subtitle,
} from './styled-components'
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
  name,
  chainId,
  hash,
  address,
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

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  chainId,
  hash,
  tokenId,
  tokenAddress,
  campaignId
}) => {
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
  return <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
    <TitleComponent>Already claimed</TitleComponent>
    <Subtitle>Somebody has already claimed this link. In case it was you, find NFT in your wallet</Subtitle>
    <ButtonsContainer>
      {openseaButton}
      {explorerUrl}
    </ButtonsContainer>
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)