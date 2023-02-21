import styled from "styled-components"
import { Button } from 'components/common'

export const PopupContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.blankColor};
  padding: 24px 16px;
  left: 0;
  top: 0;
  z-index: 2;
`

export const PopupHeader = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 40px;
`

export const LinkdropHeaderLogo = styled.img`
  max-width: 123px;
`

export const CloseButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  object-fit: cover;
`

export const PopupContent = styled.div`
  width: 100%;
  text-align: left;
`

export const PopupTitle = styled.h2`
  margin: 0 0 24px;
  font-size: 24px;
`

export const PopupButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  padding-bottom: 24px;
  left: 0;
  bottom: 0px;
`

export const ButtonStyled = styled(Button)`
  max-width: 343px;
  width: 100%;
`
