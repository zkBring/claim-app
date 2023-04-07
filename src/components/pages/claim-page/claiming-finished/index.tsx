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
  Subtitle,
  DoneIconERC20
} from './styled-components'
import { defineExplorerURL, defineOpenseaURL } from 'helpers'
import { plausibleApi } from 'data/api'
import { ERC20TokenPreview } from 'components/pages/common'
import { TDropType } from 'types'
import ClaimingFinishedERC20 from 'images/claiming-finished-erc20.png'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    tokenId,
    tokenAddress,
    campaignId,
    type,
    amount
  },
  user: {
    address
  },
  token: {
    image,
    name,
    decimals
  }
}: RootState) => ({
  image,
  address,
  name,
  chainId,
  hash,
  tokenId,
  type,
  tokenAddress,
  campaignId,
  amount,
  decimals
})

type ReduxType = ReturnType<typeof mapStateToProps>

const renderWatchTokenButton = (
  tokenId: string | null,
  tokenAddress: string | null,
  chainId: number | null,
  campaignId: string,
  type: TDropType
) => {
  if (type === 'ERC20') {
    return null
  }
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
  campaignId,
  type,
  amount,
  decimals
}) => {

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claim_finished',
      data: {
        campaignId: campaignId as string,
      }
    })
  }, [])
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
    campaignId as string,
    type as TDropType
  )

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='finished'
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
  </>

  return <Container>
    {content}
    <TitleComponent>
      {type === 'ERC20' && <DoneIconERC20 src={ClaimingFinishedERC20} />}
        Successfully claimed
      </TitleComponent>
    <Subtitle>
      Your {type === 'ERC20' ? 'tokens' : 'NFT'} will appear in your account in a few minutes
    </Subtitle>
    <ButtonsContainer>
      {openseaButton}
      {explorerUrl}
    </ButtonsContainer>
  </Container>
}

export default connect(mapStateToProps)(ClaimingFinished)