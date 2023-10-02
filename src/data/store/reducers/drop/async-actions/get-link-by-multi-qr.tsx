
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import { plausibleApi, getMultiQRData } from 'data/api'
import axios, { AxiosError } from 'axios'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { RootState } from 'data/store'

export default function getLinkByMultiQR(
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  multiscanQREncCode: string,
  address: string,
  signer?: any,
  callback?: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))

    const {
      drop: {
        whitelistOn,
        whitelistType
      }
    } = getState()

    try {
      let signing = undefined
      if (whitelistOn && whitelistType === 'address') {
        dispatch(actionsUser.setAddress(address))
        signing = await signer.signMessage('I am signing this message to verify my address (claim.linkdrop.io)')
      }

      const { data } = await getMultiQRData(
        multiscanQRId,
        scanId,
        scanIdSig,
        address,
        signing
      )

      const { encrypted_claim_link, success }: { encrypted_claim_link: string, success: boolean } = data
      if (success && encrypted_claim_link) {
        const decryptKey = ethers.utils.id(multiscanQREncCode)
        const linkDecrypted = wccrypto.decrypt({ encoded: encrypted_claim_link, symKey: decryptKey.replace('0x', '') })
        dispatch(actionsDrop.setMultiscanLinkDecrypted(linkDecrypted))
        if (linkDecrypted && callback) {
          callback(linkDecrypted)
        }
      }

      dispatch(actionsDrop.setLoading(false))

    } catch (err: any | AxiosError) {
      dispatch(actionsDrop.setLoading(false))
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          if (!window.navigator.onLine) {
            dispatch(actionsDrop.setError('qr_no_connection'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_no_connection'
              }
            })
          } else {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
          }
        } else if (err.response?.status === 404) {
          dispatch(actionsDrop.setError('qr_not_found'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_not_found'
            }
          })
        } else if (err.response?.status === 500) {
          dispatch(actionsDrop.setError('qr_error'))
          plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_error'
            }
          })
        } else if (err.response?.status === 403) {
          const { data } = err.response
          if (data.error.includes("Claim is over.")) {
            dispatch(actionsDrop.setError('qr_campaign_finished'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_finished'
              }
            })
          } else if (data.error.includes("Claim has not started yet.")) {
            dispatch(actionsDrop.setError('qr_campaign_not_started'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_started'
              }
            })
          } else if (data.error.includes("No more claims available.")) {
            dispatch(actionsDrop.setError('qr_no_links_to_share'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_no_links_to_share'
              }
            })
          } else if (data.error.includes("Dispenser is not active")) {
            dispatch(actionsDrop.setError('qr_campaign_not_active'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_active'
              }
            })
          } else if (data.errors.includes("RECEIVER_NOT_WHITELISTED")) {
            dispatch(actionsDrop.setError('qr_campaign_not_eligible'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_campaign_not_eligible'
              }
            })
          } else {
            dispatch(actionsDrop.setError('qr_error'))
            plausibleApi.invokeEvent({
              eventName: 'error',
              data: {
                err_name: 'qr_error'
              }
            })
          }
          
        }
      } else {
        if (err && err.code === "INVALID_ARGUMENT") {
          dispatch(actionsDrop.setError('qr_incorrect_parameter'))
          return plausibleApi.invokeEvent({
            eventName: 'error',
            data: {
              err_name: 'qr_incorrect_parameter'
            }
          })
        }
        dispatch(actionsDrop.setError('qr_error'))
        plausibleApi.invokeEvent({
          eventName: 'error',
          data: {
            err_name: 'qr_error'
          }
        })
      }
    }
  } 
}
