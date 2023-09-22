import { FC } from 'react'
import {
  ContainerWidget,
  WidgetTitle,
  WidgetSubtitle,
  ButtonStyled,
  Image
} from './styled-components'
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
  return <ContainerWidget>
    <Image src={SignMessageImage}/>
    <WidgetTitle>Sign a message to verify your address</WidgetTitle>
    <WidgetSubtitle>It is needed to prove your ownership of the connected wallet</WidgetSubtitle>
    <ButtonStyled
      onClick={onSubmit}
      appearance='action'
    >
      Sign
    </ButtonStyled>
  </ContainerWidget>
}

export default connect(mapStateToProps)(SignMessage)