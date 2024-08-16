import { FC } from 'react'
import {
  Container,
  ScreenButton,
  TitleComponent,
  Subtitle,
  Image
} from './styled-components'
import { defineRealNetworkName } from 'helpers'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import Wrongetwork from 'images/network.png'
import { Dispatch } from 'redux'
import { UserActions } from 'data/store/reducers/user/types'

const mapDispatcherToProps = (dispatch: Dispatch<UserActions> & IAppDispatch) => {
  return {
      switchNetwork: (
        chainId: number,
        callback?: () => void
      ) => dispatch(userAsyncActions.switchNetwork(
        chainId,
        callback
      ))
  }
}

const mapStateToProps = ({
  user: { address, chainId: userChainId, userProvider },
  token: { name, image },
  drop: { tokenId, amount, type, isManual, loading, chainId, campaignId }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  amount,
  address,
  isManual,
  loading,
  chainId,
  userChainId,
  userProvider,
  campaignId
})

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ChangeNetwork: FC<ReduxType> = ({
  chainId,
  userProvider,
  campaignId,
  type,
  switchNetwork
}) => {
  const networkName = defineRealNetworkName(chainId)
  return <Container>
    <Image src={Wrongetwork} alt='Wrong network' />
    <TitleComponent>Switch network</TitleComponent>
    <Subtitle>To claim {type === 'ERC20' ? 'tokens' : 'an NFT'} you need to switch your wallet to {networkName} network</Subtitle>
    <ScreenButton onClick={async () => {
      if (chainId) {
        switchNetwork(chainId, () => {
          window.location.reload()
        })
      } else {
        alert('No chain provided')
      }
    }}>
      Switch network
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChangeNetwork)
