import { FC } from 'react'
import { Title, Subtitle, Container, Image, ButtonStyled } from '../styles/styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import SignMessageImage from 'images/sign-message.png'
import TProps from './types'

const mapStateToProps = ({
  drop: {
    type
  },
}: RootState) => ({
  type
})

type ReduxType = ReturnType<typeof mapStateToProps> & TProps

const SignMessage: FC<ReduxType> = ({
  onSubmit,
  loading
}) => {
  return <Container>
    <Image src={SignMessageImage}/>
    <Title>Sign a message to verify your address</Title>
    <Subtitle>It is needed to prove your ownership of the connected wallet</Subtitle>
    <ButtonStyled
      onClick={onSubmit}
      appearance='action'
      loading={loading}
    >
      Sign
    </ButtonStyled>
  </Container>
}

export default connect(mapStateToProps)(SignMessage)