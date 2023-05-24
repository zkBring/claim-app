import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle
} from '../styles/styled-components'
import QRError from 'images/expired-error.png'

const ErrorScreen: FC = () => {
  return <Container>
    <Image src={QRError} />
    <Title>Campaign has not started yet</Title>
    {/* <Subtitle>Campaign will start at June 20, 2023 19:30:00 +UTC 00:00</Subtitle> */}
  </Container>
}

export default ErrorScreen