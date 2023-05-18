
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { plausibleApi } from 'data/api'
import { checkIfMultiscanIsPresented } from 'helpers'


export default function computeScanAddress(
  qrSecret: string,
  qrEncCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    dispatch(actionsDrop.setError(null))
    try {
      const linkKey = ethers.utils.id(qrSecret)
      const qrKeysPair = new ethers.Wallet(linkKey)
      const MULTISCAN_QR_ID = qrKeysPair.address.toLowerCase()
      console.log({ MULTISCAN_QR_ID })
      // const MULTISCAN_QR_SECRET_PK = qrKeysPair.privateKey
      const inLocalStorage = checkIfMultiscanIsPresented(MULTISCAN_QR_ID)
      // const qrEncCodeForDecrypt = ethers.utils.id(qrEncCode).replace('0x', '')
      if (!inLocalStorage) {
        const SCAN_ID = String(Math.random()).slice(2)
        
        const SCAN_ID_SIG = await qrKeysPair.signMessage(`Dispenser Scan Id: ${SCAN_ID}`)
        window.localStorage && window.localStorage.setItem(MULTISCAN_QR_ID, JSON.stringify({
          scanID: SCAN_ID,
          scanIDSig: SCAN_ID_SIG
        }))
        const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
        console.log({
          'place': 'no local storage',
          redirectURL
        })
        callback(redirectURL)
      } else {
        const { scanID: SCAN_ID, scanIDSig: SCAN_ID_SIG } = inLocalStorage
        const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
        console.log({
          'place': 'in local storage',
          redirectURL
        })
        callback(redirectURL)
      }

    } catch (err: any) {
      dispatch(actionsDrop.setError('qr_incorrect_parameter'))
      return plausibleApi.invokeEvent({
        eventName: 'error',
        data: {
          err_name: 'qr_incorrect_parameter'
        }
      })
    }
  } 
}
