import styled, { css } from "styled-components"
import { TProps } from "./types"
import { TTheme } from 'types'

export const HeaderNetworkWrapper = styled.div<TProps & {
  currentTheme?: TTheme
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 14px;
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

export const HeaderChainName = styled.span`
  margin-left: 8px;
  font-size: 14px;
`
