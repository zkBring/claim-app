// error_region

import { FC } from 'react'
import {
  Container,
  Image,
  Title,
} from 'components/pages/common/styles/styled-components'
import Error from 'images/error-black.png'

const ErrorRegionScreen: FC = () => {
  return <Container>
    <Image src={Error} />
    <Title>Your country is not supported</Title>
  </Container>
}

export default ErrorRegionScreen
