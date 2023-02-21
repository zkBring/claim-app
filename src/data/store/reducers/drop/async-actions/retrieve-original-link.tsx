
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { getOriginalLink } from 'data/api'
import { constructLink } from 'helpers'
import * as actionsDrop from '../actions'
import axios, { AxiosError } from 'axios'
import { TLinkParams } from 'types'

export default function retrieveOriginalLink(
  linkKey: string,
  callback: (location: string) => void
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    try {

      const linkId = new ethers.Wallet(linkKey).address
      const linkParams = await getOriginalLink(linkId)
      const { success, data } = linkParams.data
      if (success) {
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

        console.log(linkParams.data)

        const link = constructLink({
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
          wallet,
          link_key: linkKey
        })
        
        callback && callback(link)

        // if (encrypted_claim_link) {
          // callback(`${decryptedLink}${autoClaim ? '&autoClaim=true' : ''}${theme ? `&theme=${theme}` : ''}${redirectToOnboarding ? `&redirectToOnboarding=${redirectToOnboarding}` : ''}`)
        // } else {
        //   dispatch(actionsDrop.setError('qr_not_mapped'))
        // }
      } else {
        dispatch(actionsDrop.setError('qr_error'))
        alert('Some error occured')
      }
    } catch (err: any | AxiosError) {
      if (axios.isAxiosError(err)) {
        if (err.message === 'Network Error') {
          dispatch(actionsDrop.setError('qr_no_connection'))
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
