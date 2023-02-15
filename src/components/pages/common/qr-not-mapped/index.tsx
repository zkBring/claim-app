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
    <Title>QR not mapped </Title>
    <Subtitle>Please contact ledger support</Subtitle>
    <ButtonStyled href='ledgerlive://settings/help'>Support</ButtonStyled>
  </Container>
}

export default ErrorScreen
