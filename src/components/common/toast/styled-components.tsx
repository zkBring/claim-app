import styled, { css } from 'styled-components'

type TAnimation = {
  animationStart: boolean
}

export const ToastContainer = styled.div<TAnimation>`
  padding: 18px;
  display: flex;
  position: fixed;
  background-color: ${props => props.theme.toastBackgroundColor};
  border-radius: 8px;
  margin-right: -100%;
  bottom: 2%;
  right: 50%;
  transform: translateX(50%);
  transition: all 1s ease-in-out;
  z-index: 11;
  max-width: 340px;
  width: 80%;

  ${props => props.animationStart && css`
    margin-right: 0%;
  `}
`

export const ToastIcon = styled.div`
  margin-right: 10px;
`

export const ToastText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #FFF;
`
