
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import { DropActions } from '../types'
import { UserActions } from '../../user/types'

import { TokenActions } from '../../token/types'
import * as actionsUser from '../../user/actions'
import checkIfClaimed from './check-if-claimed'
import { ethers } from 'ethers'
import { RootState } from 'data/store'
import { plausibleApi } from 'data/api'

export default function getData() {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch(actionsDrop.setLoading(true))

      const {
        user: {
          provider,
          sdk
        },
        drop: {
          campaignId,
          linkKey,
          linkdropMasterAddress,
          chainId,
          claimCode
        }
      } = getState()

      if (!linkKey) {
        return alert('linkId is not provided')
      }

      if (!linkdropMasterAddress) {
        return alert('linkdropMasterAddress is not provided')
      }

      if (!campaignId) {
        return alert('campaignId is not provided')
      }

      if (!chainId) {
        return alert('campaignId is not provided')
      }


      const linkWallet = new ethers.Wallet(linkKey, provider)
      const linkId = linkWallet.address

      const interval = window.setInterval(async () => {
        const claimed = await checkIfClaimed(
          provider,
          Number(chainId),
          linkId,
          linkdropMasterAddress,
          campaignId
        )
        try {
          dispatch(actionsDrop.setLoading(false))
          const status = await sdk?.getLinkStatus(claimCode)
          
          if (claimed) {
            if (status?.txHash) {
              dispatch(actionsDrop.setHash(status.txHash))
            }
            window.clearInterval(interval)

            dispatch(actionsDrop.setIsClaimed(true))
            dispatch(actionsUser.setInitialized(false))

            return dispatch(actionsDrop.setStep('claiming_finished'))
          } else {
            if (status?.txHash) {
              const receipt = await provider.getTransactionReceipt(status?.txHash)
              if (receipt && receipt.status !== undefined && receipt.status === 0) {
                window.clearInterval(interval)
                plausibleApi.invokeEvent({
                  eventName: 'error',
                  data: {
                    err_name: 'error_transaction',
                    campaignId
                  }
                })
                return dispatch(actionsDrop.setStep('error_transaction'))
              }
            }
          }
        } catch (err) {
          console.log({ err })
        }
       
      }, 3000)
    } catch (err) {
      console.log({ err})
    }
  }
}
