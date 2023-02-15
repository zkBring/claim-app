import React, { FC } from 'react'
import { Image, Title } from './styled-components'
import ErrorImageBlack from 'images/error-black.png'
import ErrorImageWhite from 'images/error-white.png'
import { getHashVariables } from 'helpers'

const ErrorComponent: FC = () => {
  const { theme } = getHashVariables(window.location.href)
  const errorImage = theme === 'light' ? ErrorImageBlack : ErrorImageWhite

  return <>
    <Image src={errorImage} />
    <Title>Transaction failed</Title>
  </>
}

export default ErrorComponent