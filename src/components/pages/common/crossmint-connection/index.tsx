import {
  FC,
  useEffect,
  useState
} from 'react'
import {
  Container,
  TitleComponent,
  Subtitle,
  ButtonStyled,
  PreviewImage,
  Note
} from './styled-components'
import { connect } from 'react-redux'
import {
  AdditionalNoteComponent,
  OverlayScreen
} from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop-header.png'
import { PopupContents } from './components'
import Image from 'images/crossmint-image.png'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'components/common'
import { Dispatch } from 'redux'
import { RootState, IAppDispatch } from 'data/store'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  drop: {
    walletApp,
    chainId
  },
}: RootState) => ({
  walletApp,
  chainId
})



const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getCrossmintAddress: (
      jwt: string
    ) => dispatch(
      userAsyncActions.getCrossmintAddress(
        jwt
      )
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const CrossmintAwait: FC<ReduxType> = ({
  getCrossmintAddress
}) => {
  const options = useAuth0()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)

  useEffect(() => {
    const getToken = async () => {
      if (options.isAuthenticated) {
        const token = await options.getIdTokenClaims()
        if (token) {
          getCrossmintAddress(token.__raw)
        }
      }
    }
    getToken()
  }, [options.isAuthenticated])

  return <Container>
    <PreviewImage src={Image} alt='redirect await image' />
    <TitleComponent>Sign in with email</TitleComponent>
    <Subtitle>
      <Link href='https://www.crossmint.com/' target='_blank'>Crossmint</Link> allows you to create a crypto wallet by simply authenticating with your email
    </Subtitle>

    <ButtonStyled
      appearance='action'
      onClick={() => options.loginWithPopup()}
    >
      Proceed
    </ButtonStyled>
    <Note>
      Your Crossmint wallet will be available anytime at <Link href='https://www.crossmint.com/signin' target='_blank'>crossmint.com/signin</Link>
    </Note>

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

export default connect(mapStateToProps, mapDispatcherToProps)(CrossmintAwait)