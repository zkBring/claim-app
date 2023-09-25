
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import { AxiosError } from 'axios'
import { alertError } from 'helpers'

export default function resetEligibilityCheck(
  disconnect: any
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>
  ) => {
  
    try {
      dispatch(actionsUser.setAddress(''))
      if (disconnect) { disconnect() }
      dispatch(actionsDrop.setMultiscanStep('initial'))
      dispatch(actionsDrop.setError(null))
    } catch (err: any | AxiosError) {
      alertError('Some error occured. Please check console for more info')
      console.log({ err })
    }
  } 
}
