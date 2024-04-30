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
    <Title>This campaign is not available in your location</Title>
  </Container>
}

export default ErrorRegionScreen
