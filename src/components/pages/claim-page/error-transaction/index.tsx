import { FC } from 'react'
import { Image, Title } from './styled-components'
import ErrorImageBlack from 'images/error-black.png'

const ErrorComponent: FC = () => {
  return <>
    <Image src={ErrorImageBlack} />
    <Title>Transaction failed</Title>
  </>
}

export default ErrorComponent