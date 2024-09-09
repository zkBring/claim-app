import {
  FC
} from 'react'
import {
  HeaderNetworkWrapper,
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
  return <HeaderNetworkWrapper alt="network logo" src={defineNetworkIcon(chainId)} />
}

export default NetworkIndicator