import { Dispatch } from 'redux';
import * as actions from '../actions';
import { UserActions } from '../types';
import { DropActions } from '../../drop/types'

const updateUserData = (
  address: string,
  chainId: number,
  connector?: any,
  callback?: () => void,
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>
  ) => {
    try {
      dispatch(actions.setHasConnector(true))
      dispatch(actions.setAddress(address))
      dispatch(actions.setChainId(chainId))
      if (connector) {
        const provider = await connector.getProvider()
        const signer = await connector.getSigner()
        dispatch(actions.setSigner(signer))
        dispatch(actions.setUserProvider(provider))
      }
      callback && callback()
    } catch (err) {
      alert('Error occured with connector update')
    }
  }
}

export default updateUserData