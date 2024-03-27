
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { getMultiQRCampaignData } from 'data/api'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { alertError, defineJSONRpcUrl } from 'helpers'
import { TDropType, TPreviewSetting } from 'types'
import * as asyncActionsDrop from './'
const { REACT_APP_INFURA_ID } = process.env

export default function getCampaignData(
  multiscanQRId: string,
  multiscanQREncCode: string,
  callback?: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>,
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))
    const campaignData = await getMultiQRCampaignData(multiscanQRId)
    try {
      if (campaignData.data.success) {
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

        if (preview_setting === 'token') {
          const jsonRpcUrl = defineJSONRpcUrl({ chainId: Number(chain_id), infuraPk: REACT_APP_INFURA_ID as string })
          const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)
  
          if (
            token_standard && token_address && chain_id
          ) {
            await asyncActionsDrop.getTokenData(
              token_standard,
              token_address,
              token_id,
              chain_id,
              provider,
              dispatch
            )
          }
        }

        if (redirect_on && redirect_url) {
          const decryptKey = ethers.utils.id(multiscanQREncCode)
          const linkDecrypted = wccrypto.decrypt({ encoded: redirect_url, symKey: decryptKey.replace('0x', '') })
          if (linkDecrypted.includes(window.location.host)) {
            return callback && callback(linkDecrypted.split('/#')[1])
          } else {
            window.location.href = linkDecrypted
            return
          }
        }
        if (
          whitelist_on &&
          whitelist_type === 'address'
        ) {
          dispatch(actionsDrop.setMultiscanStep('whitelist'))
        } else {
          dispatch(actionsDrop.setMultiscanStep('initial'))
        }
      }

    } catch (err) {
      alertError('Some error occured. Please check console')
      console.error({ err })
    }
    dispatch(actionsDrop.setLoading(false))
  } 
}
