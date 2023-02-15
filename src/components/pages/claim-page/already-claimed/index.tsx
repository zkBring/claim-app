import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineExplorerURL,
  defineLedgerChain
} from 'helpers'
import { 
  TitleComponent,
  ButtonsContainer,
  ScreenButton,
  TokenImageSmall,
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
  let chain = defineLedgerChain({ chainId: String(chainId) })
  return <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageSmall
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
    <TitleComponent>NFT already claimed</TitleComponent>
    <Subtitle>This NFT has already been claimed. If you did that you can find it in your wallet.</Subtitle>
    <ButtonsContainer>
      {chainId && hash && <ScreenButton
        title='View in explorer'
        appearance='inverted'
        target='_blank'
        href={`${defineExplorerURL(chainId)}/tx/${hash}`}
      />}
    </ButtonsContainer>
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)