import {
  FC,
  useState
} from 'react'
import {
  Container,
  TitleComponent,
  Subtitle,
  ButtonStyled,
  PreviewImage
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  AdditionalNoteComponent,
  OverlayScreen
} from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop-header.png'
import { PopupContents } from './components'
import Image from 'images/crossmint-image.png'
import { useAuth0 } from '@auth0/auth0-react'

const mapStateToProps = ({
  drop: {
    walletApp,
    chainId
  },
}: RootState) => ({
  walletApp,
  chainId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const CrossmintAwait: FC<ReduxType> = () => {
  const {
    isAuthenticated,
    loginWithPopup,
    user
  } = useAuth0()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  console.log({ user, isAuthenticated })

  return <Container>
    <PreviewImage src={Image} alt='redirect await image' />
    <TitleComponent>Sign in with email</TitleComponent>
    <Subtitle>Crossmint allows you to create a crypto wallet by simply authenticating with your email</Subtitle>
    <ButtonStyled
      appearance='action'
      onClick={() => loginWithPopup()}
    >
      Proceed
    </ButtonStyled>
    <AdditionalNoteComponent
      text='Learn more about Crossmint'
      position='bottom'
      onClick={() => {
        setShowPopup(true)
      }}
    />
    {showPopup && <OverlayScreen
      headerLogo={LinkdropLogo}
      title='Claim asset using email'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </OverlayScreen>}
  </Container>
}

export default connect(mapStateToProps)(CrossmintAwait)