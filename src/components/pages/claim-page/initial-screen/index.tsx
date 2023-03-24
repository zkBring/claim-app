import { FC } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent,
  UserAddress,
  PoweredBy,
  PoweredByImage
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep, TDropType } from 'types'
import { shortenString } from 'helpers'
import LinkdropLogo from 'images/linkdrop-header.png'

const mapStateToProps = ({
  token: { name, image },
  user: { address, chainId: userChainId },
  drop: { tokenId, amount, type, isManual, loading, chainId }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  amount,
  isManual,
  loading,
  address,
  userChainId,
  chainId
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
    claimERC1155: () => dispatch(
      dropAsyncActions.claimERC1155(
        undefined,
        true
      )
    ),
    claimERC721: () => dispatch(
      dropAsyncActions.claimERC721(
        undefined,
        true
      )
    ),
    claimERC20: () => dispatch(
      dropAsyncActions.claimERC20(
        undefined,
        true
      )
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> 

const defineTokenId = (type: TDropType | null, tokenId?: string | null) => {
  if (type === 'ERC20' || !tokenId) { return '' }
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
        (type === 'ERC1155' && (!tokenId || !amount)) ||
        (type === 'ERC721' && (!tokenId)) ||
        (type === 'ERC20' && (!amount)) ||
        loading
      }
      loading={loading}
      appearance='default'
      title='Claim'
      onClick={() => {
        if (Number(userChainId) !== Number(chainId)) {
          return setStep('change_network')
        }
        if (type === 'ERC1155') {
          return claimERC1155()
        }
        if (type === 'ERC721') {
          return claimERC721()
        }
        if (type === 'ERC20') {
          return claimERC20()
        }
      }}
    />
  }

  return <Container> 
    {image && <TokenImageContainer src={image} alt={name} />}
    <Subtitle>{defineTokenId(type, tokenId)}</Subtitle>
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive to address: <UserAddress>{shortenString(address, 3)}</UserAddress>
    </TextComponent>
    {defineButton()}
    <PoweredBy href='https://linkdrop.io' target='_blank'>
      Powered by
      <PoweredByImage src={LinkdropLogo} alt="Linkdrop Logo"/>
    </PoweredBy>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(InitialScreen)