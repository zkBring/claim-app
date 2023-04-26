import { FC,useState } from 'react'
import {
  Container,
  TitleComponent,
  Subtitle,
  ButtonStyled,
  PreviewImage
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { AdditionalNoteComponent, OverlayScreen } from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop-header.png'
import { PopupContents } from './components'
import Image from 'images/redirect-await.png'
import { getWalletDeeplink, defineSystem } from 'helpers'

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

const WalletRedirectAwait: FC<ReduxType> = ({
  walletApp,
  chainId
}) => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  const system = defineSystem()
  const trustDeeplink = walletApp && chainId && getWalletDeeplink(walletApp, system, window.location.href, chainId)
  return <Container>
    <PreviewImage src={Image} alt='redirect await image' />
    <TitleComponent>Continue in MetaMask</TitleComponent>
    <Subtitle>You will be redirected to the wallet where you will be guided to claim an NFT</Subtitle>
    {<ButtonStyled
      onClick={() => alert('Yo!')}
      appearance='action'
    >
      Open MetaMask
    </ButtonStyled>}
    <AdditionalNoteComponent
      text='Need help? Read here how to proceed'
      position='bottom'
      onClick={() => {
        setShowPopup(true)
      }}
    />
    {showPopup && <OverlayScreen
      headerLogo={LinkdropLogo}
      title='Need Help?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </OverlayScreen>}
  </Container>
}

export default connect(mapStateToProps)(WalletRedirectAwait)