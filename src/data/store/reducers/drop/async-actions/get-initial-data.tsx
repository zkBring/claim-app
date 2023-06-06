
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import * as asyncActionsDrop from './'
import * as asyncActionsUser from '../../user/async-actions'

import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import { RootState, IAppDispatch } from 'data/store'
import { plausibleApi } from 'data/api'

export default function getData(
  onReload: () => void,
  connector: any,
  userChainId?: number,
  userAddress?: string
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    try {
      dispatch(actionsDrop.setLoading(true))

      await dispatch(asyncActionsUser.initialize(
        onReload,
        connector,
        userChainId,
        userAddress
      ))

      const {
        user: {
          provider,
          address,
          hasConnector
        },
        drop: {
          isClaimed,
          tokenAddress: linkTokenAddress,
          chainId: linkChainId,
          expirationTime,
          tokenId,
          amount,
          type,
          campaignId
        }
      } = getState()
      
      if (
        type && linkTokenAddress && linkChainId
      ) {
        await asyncActionsDrop.getTokenData(
          type,
          linkTokenAddress,
          tokenId,
          Number(linkChainId),
          provider,
          dispatch
        )
      }

      

      if (Number(expirationTime) < +new Date()) {
        dispatch(actionsDrop.setLoading(false))
        plausibleApi.invokeEvent({
          eventName: 'error',
          data: {
            err_name: 'link_expired',
            campaignId: campaignId as string
          }
        })
        return dispatch(actionsDrop.setStep('link_expired'))
      }

      if (isClaimed) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('already_claimed'))
      }

      if (!hasConnector && !address) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('set_connector'))
      }

      dispatch(actionsDrop.setLoading(false))
      dispatch(actionsDrop.setStep('initial'))
    } catch (
      error: any
    ) {
      console.log(error, error.statusCode)
    }
  }
}
