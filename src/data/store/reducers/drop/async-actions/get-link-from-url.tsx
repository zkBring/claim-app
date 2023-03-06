
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import * as actionsDrop from '../actions'
import * as asyncActionsDrop from '.'
import axios, { AxiosError } from 'axios'
import { IAppDispatch } from 'data/store'

export default function getLinkFromURL(
  linkCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & IAppDispatch
  ) => {
    dispatch(actionsDrop.setError(null))
    try {
      const link = await dispatch(asyncActionsDrop.getLinkByCode(
        linkCode,
        callback
      ))
      console.log({ link })
      
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          if (!window.navigator.onLine) {
            dispatch(actionsDrop.setError('link_no_connection'))
          } else {
            dispatch(actionsDrop.setError('link_error'))
          }
        } else if (err.response?.status === 404) {
          dispatch(actionsDrop.setError('link_not_found'))
        } else if (err.response?.status === 500) {
          dispatch(actionsDrop.setError('link_error'))
        }
      } else {
        if (err && err.code === "INVALID_ARGUMENT") {
          return dispatch(actionsDrop.setError('link_incorrect_parameter'))
        }
        dispatch(actionsDrop.setError('link_error'))
      }      
    }
  } 
}
