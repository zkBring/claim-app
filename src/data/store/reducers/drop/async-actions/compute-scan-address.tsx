
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { TDropType } from 'types'
import { plausibleApi, getMultiQRCampaignData } from 'data/api'
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
      // const MULTISCAN_QR_SECRET_PK = qrKeysPair.privateKey
      const inLocalStorage = checkIfMultiscanIsPresented(MULTISCAN_QR_ID)
      // const qrEncCodeForDecrypt = ethers.utils.id(qrEncCode).replace('0x', '')
      const campaignData = await getMultiQRCampaignData(MULTISCAN_QR_ID)
      if (campaignData.data.success) {
        const {
          campaign: {
            token_address,
            token_standard,
            sponsored,
            wallet,
            only_preferred_wallet,
            chain_id,
            campaign_number
          }
        } = campaignData.data
        dispatch(actionsDrop.setCampaignId(String(campaign_number)))
        dispatch(actionsDrop.setChainId(Number(chain_id)))
        dispatch(actionsDrop.setTokenAddress(token_address))
        dispatch(actionsDrop.setWallet(wallet))
        dispatch(actionsDrop.setIsManual(!Boolean(sponsored)))
        dispatch(actionsDrop.setType(token_standard as TDropType))
        dispatch(actionsDrop.setOnlyPreferredWallet(Boolean(only_preferred_wallet)))
      }

      if (!inLocalStorage) {
        const SCAN_ID = String(Math.random()).slice(2)
        
        const SCAN_ID_SIG = await qrKeysPair.signMessage(`Dispenser Scan Id: ${SCAN_ID}`)
        window.localStorage && window.localStorage.setItem(MULTISCAN_QR_ID, JSON.stringify({
          scanID: SCAN_ID,
          scanIDSig: SCAN_ID_SIG
        }))
        const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
        callback(redirectURL)
      } else {
        const { scanID: SCAN_ID, scanIDSig: SCAN_ID_SIG } = inLocalStorage
        const redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
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
