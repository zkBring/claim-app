
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import { IAppDispatch } from 'data/store'
import { TWalletName } from 'types'

export default function deeplinkRedirect(
  deeplink: string,
  walletId: TWalletName
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch
  ) => {
    dispatch(actionsDrop.setStep('wallet_redirect_await'))
    dispatch(actionsDrop.setWalletApp(walletId))
    window.open(deeplink, '_blank')
  }
}
