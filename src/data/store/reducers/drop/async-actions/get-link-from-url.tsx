
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import * as actionsDrop from '../actions'
import * as asyncActionsDrop from '.'
import axios, { AxiosError } from 'axios'
import { IAppDispatch, RootState } from 'data/store'
import { plausibleApi } from 'data/api'
import { TSystem } from 'types'

export default function getLinkFromURL(
  linkCode: string,
  system: TSystem,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actionsDrop.setError(null))
    const {
      drop: {
        campaignId
      }
    } = getState()
    try {
      await dispatch(asyncActionsDrop.getLinkByCode(
        linkCode,
        system,
        callback
      ))
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          if (!window.navigator.onLine) {
            dispatch(actionsDrop.setStep('error_link_no_connection'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'error_link_no_connection'
              }
            })
          } else {
            dispatch(actionsDrop.setStep('error_link'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'error_link'
              }
            })
          }
        } else if (err.response?.status === 404) {
          dispatch(actionsDrop.setStep('error_link_not_found'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'error_link_not_found'
            }
          })
        } else if (err.response?.status === 500) {
          dispatch(actionsDrop.setStep('error_link'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'error_link'
            }
          })
        }
      } else {
        if (err && err.code === "INVALID_ARGUMENT") {
          dispatch(actionsDrop.setStep('error_link_incorrect_parameter'))
          return plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'error_link_incorrect_parameter'
            }
          })
        }
        dispatch(actionsDrop.setStep('error_link'))
        plausibleApi.invokeEvent({
          eventName: 'error',
          data: {
            err_name: 'error_link'
          }
        })
      }      
    }
  } 
}
