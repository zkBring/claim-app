import { FC } from 'react'
import {
  Container,
  ScreenButton,
  TitleComponent
} from './styled-components'
import { defineRealNetworkName } from 'helpers'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { switchNetwork } from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  user: { address, chainId: userChainId, userProvider },
  token: { name, image },
  drop: { tokenId, amount, type, isManual, loading, chainId }
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
  userProvider
})


type ReduxType = ReturnType<typeof mapStateToProps>

const ChangeNetwork: FC<ReduxType> = ({
  chainId,
  userProvider
}) => {
  const networkName = defineRealNetworkName(chainId)
  return <Container> 
    <TitleComponent>To get an NFT you need to add {networkName} network</TitleComponent>
    <ScreenButton onClick={async () => {
      if (chainId) {
        switchNetwork(userProvider, chainId, () => {})
      } else {
        alert('No chain provided')
      }
    }}>
      Add Network
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps)(ChangeNetwork)
