import { FC } from 'react'
import {
  Container,
  Image,
  Title
} from './styled-components'
import ErrorImageBlack from 'images/error-black.png'

const ErrorScreen: FC = () => {
  const errorImage = ErrorImageBlack
  return <Container>
    <Image src={errorImage} />
    <Title>QR not mapped </Title>
  </Container>
}

export default ErrorScreen
