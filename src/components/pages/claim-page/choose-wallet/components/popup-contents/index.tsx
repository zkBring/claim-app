import { FC } from 'react'
import {
  PopupParagraph,
  PopupSubtitle,
  PopupTitle,
  PopupList
} from 'components/common'
import { PopupContentWithImage, ImageStyled } from './styled-components'
import WalletSmall from 'images/wallet-small.png'
import BoxSmall from 'images/box-small.png'

const PopupContents: FC = () => {
  return <>
    <PopupParagraph>
      A crypto wallet is needed to store and manage cryptocurrency in a secure and convenient way. It allows users to view their balance, send and receive cryptocurrency, and track their transaction history. In addition, many crypto wallets allow users to connect their wallet to decentralized applications (dApps) and use their cryptocurrency to interact with the dApps in various ways.
    </PopupParagraph>
    <PopupContentWithImage>
      <ImageStyled src={WalletSmall} />
      <div>
        <PopupSubtitle>A Home for your Digital Assets</PopupSubtitle>
        <PopupParagraph>
          Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs
        </PopupParagraph>
      </div>
    </PopupContentWithImage>

    <PopupContentWithImage>
      <ImageStyled src={BoxSmall} />
      <div>
        <PopupSubtitle>A New Way to Log In</PopupSubtitle>
        <PopupParagraph>
          Instead of creating new accounts and passwords on every website, just connect your wallet
        </PopupParagraph> 
      </div>
    </PopupContentWithImage>
  </>
}

export default PopupContents