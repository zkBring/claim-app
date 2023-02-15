import { FC } from 'react'
import { Title, Subtitle, ButtonStyled, Container } from './styled-components'

const ErrorComponent: FC = (props) => {
  return <Container>
    <Title>Seems you're offline</Title>
    <Subtitle>Please, try again</Subtitle>
    <ButtonStyled href='ledgerlive://linkdrop-nft-claim/qr-scanning'>Scan again</ButtonStyled>
  </Container>
}

export default ErrorComponent