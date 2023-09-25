import { FC } from 'react'
import {
  WidgetTitle,
  WidgetSubtitle,
  ButtonStyled,
  Image
} from './styled-components'
import { Container } from '../styles/styled-components'
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
  onSubmit
}) => {
  return <Container>
    <Image src={SignMessageImage}/>
    <WidgetTitle>Sign a message to verify your address</WidgetTitle>
    <WidgetSubtitle>It is needed to prove your ownership of the connected wallet</WidgetSubtitle>
    <ButtonStyled
      onClick={onSubmit}
      appearance='action'
    >
      Sign
    </ButtonStyled>
  </Container>
}

export default connect(mapStateToProps)(SignMessage)