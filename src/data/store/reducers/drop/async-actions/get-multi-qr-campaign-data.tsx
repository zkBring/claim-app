
import { Dispatch } from 'redux'
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import { getMultiQRCampaignData } from 'data/api'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { defineJSONRpcUrl } from 'helpers'
import { TDropType, TPreviewSetting } from 'types'
import * as asyncActionsDrop from './'
import axios from 'axios'
const { REACT_APP_INFURA_ID } = process.env
import * as actionsToken from '../../token/actions'
import { TokenActions } from '../../token/types'

export default function getCampaignData(
  multiscanQRId: string,
  multiscanQREncCode: string,
  callback?: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions>,
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))
    try {
      const campaignData = await getMultiQRCampaignData(multiscanQRId)
      if (campaignData.data.success) {
        const {
          campaign: {
            token_address,
            token_standard,
            sponsored,
            wallet,
            chain_id,
            campaign_number,
            token_id,
            preview_setting,
            token_amount,
            redirect_on,
            redirect_url,
            whitelist_on,
            whitelist_type,
            preferred_wallet_on,
            linkdrop_token,
            token_image,
            token_name
          }
        } = campaignData.data

        if (linkdrop_token) {
          dispatch(actionsToken.setImage(token_image))
          dispatch(actionsToken.setName(token_name))
          dispatch(actionsToken.setLinkdropToken(linkdrop_token))
        }

        dispatch(actionsDrop.setCampaignId(String(campaign_number)))
        dispatch(actionsDrop.setChainId(Number(chain_id)))
        dispatch(actionsDrop.setTokenAddress(token_address))
        dispatch(actionsDrop.setTokenId(token_id))
        dispatch(actionsDrop.setAmount(token_amount))
        dispatch(actionsDrop.setWallet(wallet))
        dispatch(actionsDrop.setIsManual(!Boolean(sponsored)))
        dispatch(actionsDrop.setType(token_standard as TDropType))
        dispatch(actionsDrop.setPreviewSetting(preview_setting as TPreviewSetting))
        dispatch(actionsDrop.setMultiscanWhitelistOn(whitelist_on))
        dispatch(actionsDrop.setMultiscanWhitelistType(whitelist_type))
        dispatch(actionsDrop.setPreferredWalletOn(Boolean(preferred_wallet_on)))

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
              linkdrop_token,
              token_image,
              token_name,
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
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          dispatch(actionsDrop.setError('qr_not_found'))
        } else {
          dispatch(actionsDrop.setError('qr_error'))
        }
      } else {
        dispatch(actionsDrop.setError('qr_error'))
      }
      console.error({ err })
    }
    dispatch(actionsDrop.setLoading(false))
  } 
}
