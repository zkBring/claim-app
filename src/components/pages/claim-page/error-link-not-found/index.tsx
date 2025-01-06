import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle
} from 'components/pages/common/styles/styled-components'
import Error from 'images/error-black.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={Error} />
    <Title>Asset does not exist</Title>
    <Subtitle>Please contact the company that provided you the short code</Subtitle>
  </Container>
}

export default ErrorScreen
