import styled from 'styled-components'
import TProps from './types'

export const TextComponent = styled.p<TProps>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  margin: 0;
  color: ${props => props.theme.additionalTextColor};
`