import { FC } from 'react'
import {
  TokenAmount,
  TitleERC20Component,
  SymbolERC20,
  IconERC20,
  Container
} from './styled-components'
import { utils } from 'ethers'
import TProps, { TStatus } from './types'

const defineTitle = (status?: TStatus) => {
  switch (status) {
    case 'finished':
      return 'You have received'
    case 'initial':
      return 'You were sent'
    default:
      return null
  }
}

const ERC20TokenPreview: FC<TProps> = ({
  image,
  amount,
  decimals,
  name,
  status
}) => {
  return <Container> 
    <TitleERC20Component>
      {defineTitle(status)} <IconERC20 src={image as string} /><SymbolERC20>{name}</SymbolERC20>
    </TitleERC20Component>
    <TokenAmount>{utils.formatUnits(amount as string, decimals)}</TokenAmount>
  </Container>
}

export default ERC20TokenPreview