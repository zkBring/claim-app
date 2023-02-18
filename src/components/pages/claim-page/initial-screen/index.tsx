import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  UserAddress,
  Terms,
  TermsLink
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep } from 'types'
import { shortenString } from 'helpers'

const mapStateToProps = ({
  token: { name, image },
  user: { address, chainId: userChainId },
  drop: { tokenId, amount, type, isManual, loading, autoClaim, chainId }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  amount,
  isManual,
  loading,
  autoClaim,
  address,
  userChainId,
  chainId
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
    claimERC1155: () => dispatch(
      dropAsyncActions.claimERC1155()
    ),
    claimERC721: () => dispatch(
      dropAsyncActions.claimERC721()
    ),
    claimERC20: () => dispatch(
      dropAsyncActions.claimERC20()
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> 

const defineTokenId = (tokenId?: string | null) => {
  if (!tokenId) { return '' }
  if (tokenId.length > 5) {
    return ` #${shortenString(tokenId, 3)}`
  }
  return ` #${tokenId}`
}

const InitialScreen: FC<ReduxType> = ({
  name,
  type,
  tokenId,
  amount,
  image,
  claimERC1155,
  claimERC721,
  claimERC20,
  loading,
  address,
  chainId,
  userChainId,
  setStep
}) => {

  const defineButton = () => {
    return <ScreenButton
      disabled={
        (type === 'erc1155' && (!tokenId || !amount)) ||
        (type === 'erc721' && (!tokenId)) ||
        (type === 'erc20' && (!amount)) ||
        loading
      }
      loading={loading}
      appearance={loading ? 'inverted' : 'default'}
      title='Claim'
      onClick={() => {
        if (Number(userChainId) !== Number(chainId)) {
          return setStep('change_network')
        }
        if (type === 'erc1155') {
          return claimERC1155()
        }
        if (type === 'erc721') {
          return claimERC721()
        }
        if (type === 'erc20') {
          return claimERC20()
        }
      }}
    />
  }

  return <Container> 
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive to address: <UserAddress>{shortenString(address, 3)}</UserAddress>
    </TextComponent>
    {defineButton()}
    <Terms>By claiming NFT you agree to <TermsLink target="_blank" href="https://www.notion.so/Terms-and-Privacy-dfa7d9b85698491d9926cbfe3c9a0a58">Terms and Conditions</TermsLink></Terms>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)