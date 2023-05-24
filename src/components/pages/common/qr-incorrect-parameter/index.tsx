import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle
} from '../styles/styled-components'
import QRError from 'images/qr-error.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={QRError} />
    <Title>Wrong request</Title>
    <Subtitle>Please check the QR code and try again</Subtitle>
  </Container>
}

export default ErrorScreen