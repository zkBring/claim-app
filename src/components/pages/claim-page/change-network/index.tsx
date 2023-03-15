import { FC } from 'react'
import {
  Container,
  ScreenButton,
  TitleComponent,
  Subtitle,
  Image
} from './styled-components'
import { defineRealNetworkName } from 'helpers'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { switchNetwork } from 'data/store/reducers/user/async-actions'
import Wrongetwork from 'images/network.png'

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
    <Image src={Wrongetwork} alt='Wrong network' />
    <TitleComponent>Wrong network</TitleComponent>
    <Subtitle>To claim an NFT you need to switch your wallet to {networkName} network</Subtitle>
    <ScreenButton onClick={async () => {
      if (chainId) {
        switchNetwork(userProvider, chainId, () => {})
      } else {
        alert('No chain provided')
      }
    }}>
      Switch Network
    </ScreenButton>
  </Container>
}

export default connect(mapStateToProps)(ChangeNetwork)
