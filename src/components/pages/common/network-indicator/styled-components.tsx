import styled, { css } from "styled-components"
import { TProps } from "./types"
import { TTheme } from 'types'

export const HeaderNetworkWrapper = styled.img<TProps & {
  currentTheme?: TTheme
}>`
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
  border-radius: 16px;
  margin-left: 8px;
  ${props => props.enableChainName && css`
    width: auto;
  `}
`


