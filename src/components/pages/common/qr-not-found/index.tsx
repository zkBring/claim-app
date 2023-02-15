import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonStyled
} from './styled-components'
import ErrorImageBlack from 'images/error-black.png'
import ErrorImageWhite from 'images/error-white.png'
import { getHashVariables } from 'helpers'

const ErrorScreen: FC = () => {
  const { theme } = getHashVariables(window.location.href)
  const errorImage = theme === 'light' ? ErrorImageBlack : ErrorImageWhite
  return <Container>
    <Image src={errorImage} />
    <Title>Asset does not exist</Title>
    <Subtitle>Please check the QR code and try again</Subtitle>
    <ButtonStyled href='ledgerlive://linkdrop-nft-claim/qr-scanning'>Scan again</ButtonStyled>
  </Container>
}

export default ErrorScreen
