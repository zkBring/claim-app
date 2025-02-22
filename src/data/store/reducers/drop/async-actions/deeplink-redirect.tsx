
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import { IAppDispatch } from 'data/store'
import { TWalletName } from 'types'

export default function deeplinkRedirect(
  deeplink: string,
  walletId: TWalletName,
  redirectCallback: () => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch
  ) => {
    dispatch(actionsDrop.setWalletApp(walletId))
    const link = document.createElement('a')
    link.href = deeplink
    link.target = '_blank'
    link.click()
    redirectCallback && redirectCallback()
  }
}
