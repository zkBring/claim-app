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
import { Popup, Note } from 'components/common'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux';
import { DropActions } from 'data/store/reducers/drop/types'
import { PopupContents } from './components'
import { defineSystem } from 'helpers'
import { plausibleApi } from 'data/api'

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
  campaignId
}) => {
  const system = defineSystem()
  const [ showPopup, setShowPopup ] = useState<boolean>(false)
  return <Container> 
    <WalletIcon src={WalletsImg} />
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      To claim an NFT, you will need to have a non-custodial crypto-wallet set up and ready to use
    </TextComponent>
    <ScreenButton onClick={async () => {
      plausibleApi.invokeEvent({
        eventName: 'goto_choose_wallet',
        data: {
          campaignId: campaignId as string
        }
      })
      chooseWallet()
    }}>
      Connect
    </ScreenButton>
    {system !== 'desktop' && <Note
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
    {showPopup && <Popup
      title='What is a Wallet?'
      onCloseAction={() => { setShowPopup(false) }}
      mainAction={() => { setShowPopup(false) }}
    >
      <PopupContents />
    </Popup>}
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ChooseWallet)