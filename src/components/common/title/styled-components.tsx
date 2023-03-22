import styled from 'styled-components'

import TProps from './types'

export const TitleComponent = styled.h2<TProps>`
  font-weight: 600;
  font-size: 22px;
  line-height: 28px;
  margin: 0;
  color: ${props => props.theme.primaryTextColor}
`