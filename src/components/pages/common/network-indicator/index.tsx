import {
  FC
} from 'react'
import {
  HeaderNetworkWrapper,
  HeaderNetwork,
  HeaderChainName
} from './styled-components'
import {
  defineNetworkIcon,
  defineRealNetworkName
} from 'helpers'
import { TProps } from './types'
import { Dispatch } from 'redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { IAppDispatch } from 'data/store'
import { UserActions } from 'data/store/reducers/user/types'
import { connect } from 'react-redux'

const mapDispatcherToProps = (dispatch:Dispatch<UserActions> & IAppDispatch ) => {
  return {
    logout: () => dispatch(userAsyncActions.logout())
  }
}

// @ts-ignore
type ReduxType = ReturnType<typeof mapDispatcherToProps>

const NetworkIndicator: FC<TProps & ReduxType> = ({
  chainId,
  className
}) => {
  if (!chainId) {
    return null
  }
  const chainName = chainId && defineRealNetworkName(chainId)
  return <HeaderNetworkWrapper
    className={className}
  >
    {chainId && <HeaderNetwork alt="network logo" src={defineNetworkIcon(chainId)} />}
    <HeaderChainName>{chainName}</HeaderChainName>
  </HeaderNetworkWrapper>
}

// @ts-ignore
export default connect(null, mapDispatcherToProps)(NetworkIndicator)