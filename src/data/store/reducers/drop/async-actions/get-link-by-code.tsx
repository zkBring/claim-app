
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { UserActions } from '../../user/types'
import { ethers } from 'ethers'
import * as actionsDrop from '../actions'
import * as actionsUser from '../../user/actions'
import { TLinkParams, TDropType } from 'types'
import LinkdropSDK from 'linkdrop-sdk'

export default function getLinkByCode(
  linkCode: string,
  callback?: (linkCode: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<UserActions>
  ) => {
    dispatch(actionsDrop.setLoading(true))
    dispatch(actionsDrop.setError(null))
    const sdk = new LinkdropSDK()
    dispatch(actionsUser.setSDK(sdk)) 
    const linkKey = ethers.utils.id(linkCode)
    const linkId = new ethers.Wallet(linkKey).address

    const data = await sdk.getLinkParams(linkCode)
    
    if (data) {
      const {
        creator_address,
        sponsored,
        chain_id,
        campaign_number,
        token_address,
        token_standard,
        symbol,
        claim_pattern,
        token_id,
        token_amount,
        sender_signature,
        proxy_contract_version,
        wei_amount,
        expiration_time,
        wallet
      } : TLinkParams = data

      dispatch(actionsDrop.setChainId(Number(chain_id)))
      dispatch(actionsDrop.setTokenAddress(token_address))
      dispatch(actionsDrop.setWallet(wallet))
      dispatch(actionsDrop.setIsManual(!Boolean(sponsored)))
      dispatch(actionsDrop.setExpirationTime(expiration_time))
      dispatch(actionsDrop.setLinkdropMasterAddress(creator_address))
      dispatch(actionsDrop.setLinkdropSignerSignature(sender_signature))
      dispatch(actionsDrop.setCampaignId(campaign_number))
      dispatch(actionsDrop.setWeiAmount(wei_amount))
      dispatch(actionsDrop.setAmount(token_amount))
      dispatch(actionsDrop.setTokenId(token_id))
      dispatch(actionsDrop.setType(token_standard as TDropType))
      dispatch(actionsDrop.setAmount(token_amount))
      dispatch(actionsDrop.setLoading(false))
      dispatch(actionsDrop.setClaimCode(linkCode))
      dispatch(actionsDrop.setLinkId(linkId))
      dispatch(actionsDrop.setLinkKey(linkKey))
      callback && callback(linkCode)
  } 
}}