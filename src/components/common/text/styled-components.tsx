import styled from 'styled-components'
import TProps from './types'

export const TextComponent = styled.p<TProps>`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  margin: 0;
  color: ${props => props.theme.additionalTextColor};
`