import { FC } from 'react'
import { Image, Title, Subtitle, ButtonStyled } from './styled-components'
import ErrorImageBlack from 'images/error-black.png'
import ErrorImageWhite from 'images/error-white.png'
import { getHashVariables } from 'helpers'

const ErrorComponent: FC = (props) => {
  const { theme } = getHashVariables(window.location.href)
  const errorImage = theme === 'light' ? ErrorImageBlack : ErrorImageWhite
  return <>
    <Image src={errorImage} />
    <Title>Link has expired</Title>
  </>
}

export default ErrorComponent