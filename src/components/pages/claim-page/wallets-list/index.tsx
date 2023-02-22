import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { walletConnect } from 'components/application/connectors/wallet-connect'
import { Popup, Note, PopupParagraph, PopupSubtitle, PopupTitle, PopupList } from 'components/common'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const WalletsList: FC<ReduxType> = () => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container>
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Choose a wallet from the list
    </TextComponent>
    <Note
      text='Connect your wallet'
      position='bottom'
      onClick={() => { setShowPopup(true) }}
    />
    {showPopup && <Popup
      title='Don’t know what to choose?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupSubtitle>Why do I need a wallet?</PopupSubtitle>
      <PopupParagraph>
        A crypto wallet is necessary to connect to a web3 service because it allows you to authenticate your identity and authorize your actions on the Ethereum blockchain.
      </PopupParagraph>
      <PopupSubtitle>Why is wallet connection required?</PopupSubtitle>
      <PopupParagraph>
        Connecting a crypto wallet to a website allows you to use your cryptocurrency and interact with the Ethereum blockchain in a convenient and secure manner.
      </PopupParagraph>
      <PopupTitle>Which wallet to choose?</PopupTitle>
      <PopupSubtitle>Metamask</PopupSubtitle>
      <PopupList>
        <li>Provides access to a wide range of decentralized applications (dApps)</li>
        <li>Offers a desktop browser extension that allows users to access their wallet from within their web browser.</li>
      </PopupList>
      <PopupSubtitle>Zerion Wallet</PopupSubtitle>
      <PopupList>
        <li>Has a simple and user-friendly interface.</li>
        <li>Offers a feature called Zerion Dashboard that allows users to track their portfolio and manage investments.</li>
      </PopupList>
      <PopupSubtitle>Trust Wallet</PopupSubtitle>
      <PopupList>
        <li>Supports a wide range of cryptocurrencies and allows users to buy, sell, and manage their cryptocurrency.</li>
      </PopupList>
    </Popup>}
  </Container>
}

export default connect(mapStateToProps)(WalletsList)