import styled, { css } from "styled-components"
import { NetworkIndicator } from '..'

export const Header = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: end;
  margin-bottom: 24px;
  font-size: 24px;
  line-height: 36px;
  min-height: 58px;
  max-width: 1024px;
  margin: 0 auto;
  padding: 10px 20px;
  color: ${props => props.theme.primaryTextColor};
`

export const NetworkIndicatorStyled = styled(NetworkIndicator)`
  
`


export const Account = styled.div`
  height: 36px;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 2px 0 2px;
  color: ${props => props.theme.primaryTextColor};
  justify-content: center;
  font-size: 14px;
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};

  @media (max-width: 768px) {
    display: none;
  }
`

export const Address = styled.div`
  height: 28px;
  border-radius: 28px;
  background: ${props => props.theme.secondaryBackgroundColor};
  padding-left: 14px;
  color: ${props => props.theme.primaryTextColor};

  padding-right: 14px;
  display: flex;
  align-items: center;
`

export const Logout = styled.div<{
}>`
  border-radius: 36px;
  border: 1px solid ${props => props.theme.primaryBorderColor};
  background: ${props => props.theme.primaryBackgroundColor};
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  svg {
    path {
      stroke: ${props => props.theme.primaryTextColor};
    }
  }
  &:hover {
    ${props => {
      return css`
        border-color: transparent;
        background-color: ${props => props.theme.tagDefaultColor};
      `
    }};
  }
`
