import styled from "styled-components"

export const TokenAmount = styled.div`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
`

export const TitleERC20Component = styled.h4`
  font-size: 16px;
  margin: 0 0 4px;
  color: ${props => props.theme.additionalTextColor};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SymbolERC20 = styled.span`
  color: ${props => props.theme.primaryTextColor};
`

export const IconERC20 = styled.img`
  max-width: 16px;
  width: 100%;
  margin: 0 4px;
`

export const Container = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 32px;
  padding-top: 40px;
`