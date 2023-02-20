import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageSmall,
  TokenImageContainer,
  DoneIcon,
  Container,
  Description
} from './styled-components'
import { defineExplorerURL } from 'helpers'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    redirectToOnboarding
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
  redirectToOnboarding
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinished: FC<ReduxType> = ({
  image,
  name,
  hash,
  chainId
}) => {
  const title = <TitleComponent>Successfully claimed</TitleComponent>
  const explorerUrl = chainId && hash ? <ScreenButton
    href={`${defineExplorerURL(chainId)}/tx/${hash}`}
    title='View in explorer'
    target='_blank'
    appearance='inverted'
  /> : null
  return <Container>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageSmall
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
    {title}
    <Description>
      Your NFT will appear in your account in a few minutes
    </Description>
    <ButtonsContainer>
      <ScreenButton>
        View on OpenSea
      </ScreenButton>
      {explorerUrl}
    </ButtonsContainer>
  </Container>
}

export default connect(mapStateToProps)(ClaimingFinished)