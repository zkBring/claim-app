import styled, { css } from "styled-components"
import { TProps } from "./types"
import { TTheme } from 'types'

export const HeaderNetworkWrapper = styled.div<TProps & {
  currentTheme?: TTheme
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  justify-content: center;
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryTextColor};

  ${props => props.enableChainName && css`
    width: auto;
  `}
`

export const HeaderNetwork = styled.img`
  display: block;
  max-width: 16px;
`

