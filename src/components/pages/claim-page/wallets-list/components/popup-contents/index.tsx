import { FC } from 'react'
import {
  PopupParagraph,
  PopupSubtitle,
  PopupTitle,
  PopupList
} from 'components/common'

const PopupContents: FC = () => {
  return <>
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
    <PopupSubtitle>Trust Wallet</PopupSubtitle>
    <PopupList>
      <li>Supports a wide range of cryptocurrencies and allows users to buy, sell, and manage their cryptocurrency.</li>
    </PopupList>
    <PopupSubtitle>Coinbase</PopupSubtitle>
    <PopupList>
      <li>Allows easy buying and selling of cryptocurrency.</li>
      <li>Provides access to professional support and customer service.</li>
      <li>Supports a limited range of cryptocurrencies.</li>
    </PopupList>
  </>
}

export default PopupContents