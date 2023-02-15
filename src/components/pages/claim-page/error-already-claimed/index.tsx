import { FC } from 'react'
import { Image, Title, Subtitle } from './styled-components'
import SmileBlack from 'images/smile-black.png'
import SmileWhite from 'images/smile-white.png'
import { getHashVariables } from 'helpers'

const ErrorComponent: FC = () => {
  const { theme } = getHashVariables(window.location.href)
  const errorImage = theme === 'light' ? SmileBlack : SmileWhite
  return <>
    <Image src={errorImage} />
    <Title>NFT already claimed</Title>
    <Subtitle>Please check your wallet</Subtitle>
  </>
}

export default ErrorComponent