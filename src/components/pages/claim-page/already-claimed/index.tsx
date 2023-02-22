import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineExplorerURL
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
  name,
  chainId,
  hash,
  address,
  redirectToOnboarding
})

type ReduxType = ReturnType<typeof mapStateToProps>

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  chainId,
  hash,
}) => {
  const explorerUrl = chainId && hash ? <ScreenButton
    href={`${defineExplorerURL(chainId)}/tx/${hash}`}
    title='View in explorer'
    target='_blank'
    appearance='inverted'
  /> : null
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
      {explorerUrl}
    </ButtonsContainer>
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)