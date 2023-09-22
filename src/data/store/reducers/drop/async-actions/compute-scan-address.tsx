
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { TDropType, TPreviewSetting } from 'types'
import { plausibleApi, getMultiQRCampaignData } from 'data/api'
import { checkIfMultiscanIsPresented } from 'helpers'
import { IAppDispatch } from 'data/store'
import * as wccrypto from '@walletconnect/utils/dist/esm'



export default function computeScanAddress(
  qrSecret: string,
  qrEncCode: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & IAppDispatch
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
        console.log(
          campaignData.data
        )
        const {
          campaign: {
            token_address,
            token_standard,
            sponsored,
            wallet,
            available_wallets,
            chain_id,
            campaign_number,
            token_id,
            preview_setting,
            token_amount,
            redirect_on,
            redirect_url,
            whitelist_on,
            whitelist_type
          }
        } = campaignData.data
        dispatch(actionsDrop.setCampaignId(String(campaign_number)))
        dispatch(actionsDrop.setChainId(Number(chain_id)))
        dispatch(actionsDrop.setTokenAddress(token_address))
        dispatch(actionsDrop.setTokenId(token_id))
        dispatch(actionsDrop.setAmount(token_amount))
        dispatch(actionsDrop.setWallet(wallet))
        dispatch(actionsDrop.setIsManual(!Boolean(sponsored)))
        dispatch(actionsDrop.setType(token_standard as TDropType))
        dispatch(actionsDrop.setPreviewSetting(preview_setting as TPreviewSetting))
        dispatch(actionsDrop.setAvailableWallets(available_wallets))

        dispatch(actionsDrop.setMultiscanWhitelistOn(whitelist_on))
        dispatch(actionsDrop.setMultiscanWhitelistType(whitelist_type))
        dispatch(actionsDrop.setAvailableWallets(available_wallets))

        if (redirect_on && redirect_url) {
          const decryptKey = ethers.utils.id(qrEncCode)
          const linkDecrypted = wccrypto.decrypt({ encoded: redirect_url, symKey: decryptKey.replace('0x', '') })
          if (linkDecrypted.includes(window.location.host)) {
            return callback(linkDecrypted.split('/#')[1])
          } else {
            window.location.href = linkDecrypted
            return
          }
        }
      }

      let redirectURL = ''

      if (!inLocalStorage) {
        const SCAN_ID = String(Math.random()).slice(2)
        
        const SCAN_ID_SIG = await qrKeysPair.signMessage(`Dispenser Scan Id: ${SCAN_ID}`)
        window.localStorage && window.localStorage.setItem(MULTISCAN_QR_ID, JSON.stringify({
          scanID: SCAN_ID,
          scanIDSig: SCAN_ID_SIG
        }))
        redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
        callback(redirectURL)
      } else {
        const { scanID: SCAN_ID, scanIDSig: SCAN_ID_SIG } = inLocalStorage
        redirectURL = `/scan/${MULTISCAN_QR_ID}/${SCAN_ID}/${SCAN_ID_SIG}/${qrEncCode}`
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
