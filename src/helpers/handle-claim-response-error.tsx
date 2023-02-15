import { Dispatch } from 'redux';
import { DropActions } from '../data/store/reducers/drop/types'
import { UserActions } from '../data/store/reducers/user/types'
import * as dropActions from '../data/store/reducers/drop/actions'
import axios, { AxiosError } from 'axios'

const handleError = (
  dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
  error: any | AxiosError
) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 422) {
      dispatch(dropActions.setStep('error_already_claimed'))
    } else {
      dispatch(dropActions.setStep('error_server_fail'))
    }
    
  } else {
    console.log({ error })
    if(error.statusCode === 0) {
      dispatch(dropActions.setStep('error_no_connection'))
    } else {
      dispatch(dropActions.setStep('error'))
    }
  }
}

export default handleError