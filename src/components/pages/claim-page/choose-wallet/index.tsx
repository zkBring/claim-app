import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import WalletsImg from 'images/wallets.png'
import { AdditionalNoteComponent } from 'linkdrop-ui'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupContents } from './components'
import { defineSystem } from 'helpers'
import { plausibleApi } from 'data/api'
import { OverlayScreen } from 'linkdrop-ui'
import LinkdropLogo from 'images/linkdrop-header.png'

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, campaignId }
}: RootState) => ({
  name, image, type, tokenId, campaignId
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    chooseWallet: () => dispatch(
      dropActions.setStep('wallets_list')
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ChooseWallet: FC<ReduxType> = ({
  chooseWallet,
  campaignId,
  type
}) => {
  const system = defineSystem()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim {type === 'ERC20' ? 'tokens' : 'an NFT'} you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton
      appearance='action'
      onClick={async () => {
        plausibleApi.invokeEvent({
          eventName: 'goto_choose_wallet',
          data: {
            campaignId: campaignId as string
          }
        })
        chooseWallet()
      }
    }>
      Connect
    </ScreenButton>
    {system !== 'desktop' && <AdditionalNoteComponent
      text='What is a Wallet?'
      position='bottom'
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'educate_me',
          data: {
            campaignId: campaignId as string,
            screen: 'what_is_a_wallet '
          }
        })
        setShowPopup(true)
      }}
    />}
    {showPopup && <OverlayScreen
      title='What is a Wallet?'
      headerLogo={LinkdropLogo}
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </OverlayScreen>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)