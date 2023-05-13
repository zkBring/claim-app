
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { getQRData } from 'data/api'
import * as actionsDrop from '../actions'
import axios, { AxiosError } from 'axios'
import { plausibleApi } from 'data/api'
import { checkIfMultiscanIsPresented } from 'helpers'

export default function getLink(
  qrSecret: string,
  qrEncCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    dispatch(actionsDrop.setError(null))
    try {
      const qrKeysPair = new ethers.Wallet(qrSecret)
      const MULTISCAN_QR_ID = qrKeysPair.address
      const MULTISCAN_QR_SECRET_PK = qrKeysPair.privateKey
      const inLocalStorage = checkIfMultiscanIsPresented(MULTISCAN_QR_ID)
      if (!inLocalStorage) {
        const SCAN_ID = String(Math.random()).slice(2)
        const SCAN_ID_SIG = await qrKeysPair.signMessage(SCAN_ID)
        window.localStorage && window.localStorage.setItem(MULTISCAN_QR_ID, JSON.stringify({
          scanID: SCAN_ID,
          scanIDSig: SCAN_ID_SIG
        }))

      } else {
        const { scanID: SCAN_ID, scanIDSig: SCAN_ID_SIG } = inLocalStorage
      }
      
     


      const qrEncCodeForDecrypt = ethers.utils.id(qrEncCode).replace('0x', '')
      


      // const linkEncrypted = await getQRData(qrId)


      // const { success, encrypted_claim_link }: { success: boolean, encrypted_claim_link: string } = linkEncrypted.data
      // if (success) {
      //   if (encrypted_claim_link) {
      //     const decryptedLink = wccrypto.decrypt({ encoded: encrypted_claim_link, symKey: qrSecret })
      //     callback(decryptedLink)
      //   } else {
      //     dispatch(actionsDrop.setError('qr_not_mapped'))
      //     plausibleApi.invokeEvent({
      //       eventName: 'error',
      //       data: {
      //         err_name: 'qr_not_mapped'
      //       }
      //     })
      //   }
      // } else {
      //   dispatch(actionsDrop.setError('qr_error'))
      //   plausibleApi.invokeEvent({
      //     eventName: 'error',
      //     data: {
      //       err_name: 'qr_error'
      //     }
      //   })
      //   alert('Some error occured')
      // }
    } catch (err: any | AxiosError) {
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
