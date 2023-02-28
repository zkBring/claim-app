import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonStyled
} from './styled-components'
import QRError from 'images/qr-error.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={QRError} />
    <Title>QR not mapped</Title>
    <Subtitle>Please contact the company that provided you the QR code</Subtitle>
    <ButtonStyled appearance='inverted'>Learn more</ButtonStyled>
  </Container>
}

export default ErrorScreen
