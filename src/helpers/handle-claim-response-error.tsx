import { Dispatch } from 'redux';
import { DropActions } from '../data/store/reducers/drop/types'
import { UserActions } from '../data/store/reducers/user/types'
import * as dropActions from '../data/store/reducers/drop/actions'
import axios, { AxiosError } from 'axios'
import { plausibleApi } from 'data/api'

const handleError = (
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
  campaignId: string,
  error: any | AxiosError
) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 422) {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error_already_claimed',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error_already_claimed'))
    } else {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error_server_fail',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error_server_fail'))
    }
    
  } else {
    if(!window.navigator.onLine) {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error_no_connection',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error_no_connection'))
    } else {
      plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'error',
          campaignId
        }
      })
      dispatch(dropActions.setStep('error'))
    }
  }
}

export default handleError