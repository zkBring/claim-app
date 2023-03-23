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

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    tokenId,
    tokenAddress
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
  tokenAddress
})

type ReduxType = ReturnType<typeof mapStateToProps>

const renderWatchTokenButton = (tokenId: string | null, tokenAddress: string | null, chainId: number | null) => {
  if (!tokenId || !tokenAddress || !chainId) { return null }
  const watchTokenUrl = defineOpenseaURL(
    chainId,
    tokenAddress,
    tokenId
  )
  return <ScreenButton
    href={watchTokenUrl}
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
  tokenAddress
}) => {
  const explorerUrl = chainId && hash ? <ScreenButton
    href={`${defineExplorerURL(chainId)}/tx/${hash}`}
    title='View in Explorer'
    target='_blank'
    appearance='inverted'
  /> : null
  const openseaButton = renderWatchTokenButton(
    tokenId,
    tokenAddress,
    chainId
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