import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle
} from './styled-components'
import ErrorImageBlack from 'images/error-black.png'

const ErrorScreen: FC = () => {
  const errorImage = ErrorImageBlack

  return <Container>
    <Image src={errorImage} />
    <Title>Wrong request</Title>
    <Subtitle>Please check the QR code and try again</Subtitle>
  </Container>
}

export default ErrorScreen