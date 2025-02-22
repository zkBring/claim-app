import { Dispatch } from 'redux'
import * as userActions from '../actions'
import * as dropActions from '../../drop/actions'

import { UserActions } from '../types'
import { DropActions } from '../../drop/types'
import { RootState, IAppDispatch } from 'data/store'

const updateUserData = (
  address: string,
  chainId: number,
  connector?: any,
  signer?: any,
  callback?: () => void,
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>,
    getState: () => RootState
  ) => {
    const {
      drop: {
        isClaimed
      }
    } = getState()

    try {
      dispatch(userActions.setHasConnector(true))
      dispatch(userActions.setAddress(address))
      dispatch(userActions.setChainId(chainId))
      if (connector) {
        if (connector.getProvider) {
          const provider = await connector.getProvider()
          dispatch(userActions.setUserProvider(provider))
        }
      }
      if (signer) {
        dispatch(userActions.setSigner(signer))
      }
      if (isClaimed) {
        return dispatch(dropActions.setStep('already_claimed'))
      }
      callback && callback()
    } catch (err) {
      alert('Error occured with connector update')
    }
  }
}

export default updateUserData