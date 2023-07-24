import { FC } from 'react'
import {
  OverlayParagraph,
} from 'linkdrop-ui'

const PopupContents: FC = () => {
  return <>
    <OverlayParagraph>
      Crossmint allows you to create a crypto wallet by simply authenticating with your email. Digital assets that you claim with Linkdrop will be transferred to this wallet.
    </OverlayParagraph>
    <OverlayParagraph>
    Your Crossmint wallet will be available anytime at www.crossmint.com/signin
    </OverlayParagraph>
    <OverlayParagraph>
    Later when you learn more about web3, you will be always able to transfer your assets to a more secure non-custodial wallet.
    </OverlayParagraph>
  </>
}

export default PopupContents