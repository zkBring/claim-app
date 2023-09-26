import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle,
} from '../styles/styled-components'
import QRError from 'images/qr-error.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={QRError} />
    <Title>Asset does not exist</Title>
    <Subtitle>Please contact the company that provided you the QR code</Subtitle>
  </Container>
}

export default ErrorScreen
