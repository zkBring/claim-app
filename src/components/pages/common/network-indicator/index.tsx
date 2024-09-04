import {
  FC
} from 'react'
import {
  HeaderNetworkWrapper,
  HeaderNetwork
} from './styled-components'
import {
  defineNetworkIcon,
} from 'helpers'
import { TProps } from './types'

const NetworkIndicator: FC<TProps> = ({
  chainId,
  className
}) => {
  if (!chainId) {
    return null
  }
  return <HeaderNetworkWrapper
    className={className}
  >
    {chainId && <HeaderNetwork alt="network logo" src={defineNetworkIcon(chainId)} />}
  </HeaderNetworkWrapper>
}

export default NetworkIndicator