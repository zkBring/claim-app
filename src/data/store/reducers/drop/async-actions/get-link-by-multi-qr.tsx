
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { plausibleApi, getMultiQRData } from 'data/api'
import { checkIfMultiscanIsPresented } from 'helpers'
import axios, { AxiosError } from 'axios'

export default function getLinkByMultiQR(
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  multiscanQREncCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))

    try {
    //   const linkKey = ethers.utils.id(qrSecret)
    //   const qrKeysPair = new ethers.Wallet(linkKey)
    //   const MULTISCAN_QR_ID = qrKeysPair.address
    //   // const MULTISCAN_QR_SECRET_PK = qrKeysPair.privateKey
    //   const inLocalStorage = checkIfMultiscanIsPresented(MULTISCAN_QR_ID)
    //   // const qrEncCodeForDecrypt = ethers.utils.id(qrEncCode).replace('0x', '')
    //   if (!inLocalStorage) {
    //     const SCAN_ID = String(Math.random()).slice(2)
        
    //     const SCAN_ID_SIG = await qrKeysPair.signMessage(`Dispenser Scan Id: ${SCAN_ID}`)
    //     window.localStorage && window.localStorage.setItem(MULTISCAN_QR_ID, JSON.stringify({
    //       scanID: SCAN_ID,
    //       scanIDSig: SCAN_ID_SIG
    //     }))
    //     const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
    //     console.log({
    //       'place': 'no local storage',
    //       redirectURL
    //     })
    //   } else {
    //     const { scanID: SCAN_ID, scanIDSig: SCAN_ID_SIG } = inLocalStorage
    //     const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
    //     console.log({
    //       'place': 'in local storage',
    //       redirectURL
    //     })
    //   }

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
