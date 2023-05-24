import { FC } from 'react'
import { Title, Subtitle, Container } from '../styles/styled-components'

const ErrorComponent: FC = (props) => {
  return <Container>
    <Title>Seems you're offline</Title>
    <Subtitle>Please, try again</Subtitle>
  </Container>
}

export default ErrorComponent