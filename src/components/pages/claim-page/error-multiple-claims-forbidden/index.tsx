// error_region

import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle
} from 'components/pages/common/styles/styled-components'
import Error from 'images/error-black.png'

const ErrorMultipleClaimsForbidden: FC = () => {
  return <Container>
    <Image src={Error} />
    <Title>
      You have already claimed a link
    </Title>
    <Subtitle>If you believe this is an error or have any questions, please contact the organization that shared this link with you.</Subtitle>
  </Container>
}

export default ErrorMultipleClaimsForbidden
