import { FC } from 'react'
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
  address,
  name,
  chainId,
  hash,
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

const ClaimingFinished: FC<ReduxType> = ({
  image,
  name,
  hash,
  chainId,
  tokenId,
  tokenAddress
}) => {
  const title = <TitleComponent>Successfully claimed</TitleComponent>
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