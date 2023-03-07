import { Dispatch } from 'redux';
import * as actions from '../actions';
import { UserActions } from '../types';
import { DropActions } from '../../drop/types'
import * as actionsDrop from '../../drop/actions';

const updateUserData = (
  address: string,
  chainId: number,
  provider: any
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>
  ) => {
    dispatch(actions.setHasConnector(true))
    dispatch(actions.setAddress(address))
    dispatch(actions.setChainId(chainId))
    dispatch(actions.setUserProvider(provider))
    dispatch(actionsDrop.setStep('initial'))
  }
}

export default updateUserData