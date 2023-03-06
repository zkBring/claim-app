
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { getQRData } from 'data/api'
import * as actionsDrop from '../actions'
import axios, { AxiosError } from 'axios'

export default function getLink(
  qrSecret: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    dispatch(actionsDrop.setError(null))
    try {

      const qrId = new ethers.Wallet(qrSecret).address
      const linkEncrypted = await getQRData(qrId)
      const { success, encrypted_claim_link }: { success: boolean, encrypted_claim_link: string } = linkEncrypted.data
      if (success) {
        if (encrypted_claim_link) {
          const decryptedLink = wccrypto.decrypt({ encoded: encrypted_claim_link, symKey: qrSecret })
          callback(decryptedLink)
        } else {
          dispatch(actionsDrop.setError('qr_not_mapped'))
        }
      } else {
        dispatch(actionsDrop.setError('qr_error'))
        alert('Some error occured')
      }
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          if (!window.navigator.onLine) {
            dispatch(actionsDrop.setError('qr_no_connection'))
          } else {
            dispatch(actionsDrop.setError('qr_error'))
          }
          
        } else if (err.response?.status === 404) {
          dispatch(actionsDrop.setError('qr_not_found'))
        } else if (err.response?.status === 500) {
          dispatch(actionsDrop.setError('qr_error'))
        }
      } else {
        if (err && err.code === "INVALID_ARGUMENT") {
          return dispatch(actionsDrop.setError('qr_incorrect_parameter'))
        }
        dispatch(actionsDrop.setError('qr_error'))
      }      
    }
  } 
}
