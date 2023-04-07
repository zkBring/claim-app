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
  DoneIconERC20
} from './styled-components'
import { plausibleApi } from 'data/api'
import { ERC20TokenPreview } from 'components/pages/common'
import { TDropType } from 'types'
import AlreadyClaimedERC20 from 'images/already-claimed-erc20.png'

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
  name,
  chainId,
  hash,
  address,
  tokenId,
  tokenAddress,
  campaignId,
  type,
  decimals,
  amount
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

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  chainId,
  hash,
  tokenId,
  tokenAddress,
  campaignId,
  type,
  amount,
  decimals
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
    campaignId as string,
    type as TDropType
  )

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
  </>

  return <>
    {content}
    <TitleComponent>
      {type === 'ERC20' && <DoneIconERC20 src={AlreadyClaimedERC20} />}
      Already claimed
    </TitleComponent>
    <Subtitle>Somebody has already claimed this link. In case it was you, find {type === 'ERC20' ? 'tokens' : 'NFT'} in your wallet</Subtitle>
    <ButtonsContainer>
      {openseaButton}
      {explorerUrl}
    </ButtonsContainer>
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)