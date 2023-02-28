import { FC } from 'react'
import { Image, Title, Subtitle } from './styled-components'
import ExpiredError from 'images/expired-error.png'

const ErrorComponent: FC = () => {
  return <>
    <Image src={ExpiredError} />
    <Title>NFT already claimed</Title>
    <Subtitle>Please check your wallet</Subtitle>
  </>
}

export default ErrorComponent