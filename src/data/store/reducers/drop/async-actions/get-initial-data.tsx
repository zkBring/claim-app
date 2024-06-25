
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
  signer: any,
  userChainId?: number,
  userAddress?: string
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {

    const {
      drop: {
        campaignId
      }
    } = getState()
    
    try {
      dispatch(actionsDrop.setLoading(true))
      if (campaignId === "1719334012456") {
        alert('GET_INITIAL_DATA_1')
      }  

      await dispatch(asyncActionsUser.initialize(
        onReload,
        connector,
        signer,
        userChainId,
        userAddress
      ))
      if (campaignId === "1719334012456") {
        alert('GET_INITIAL_DATA_2')
      }
      const {
        user: {
          provider,
          address,
          hasConnector,
          sdk
        },
        drop: {
          isClaimed,
          tokenAddress: linkTokenAddress,
          chainId: linkChainId,
          expirationTime,
          tokenId,
          type,
          claimCode
        }
      } = getState()
      
      if (
        type && linkTokenAddress && linkChainId
      ) {
        if (campaignId === "1719334012456") {
          alert('GET_INITIAL_DATA_3')
        }
        await asyncActionsDrop.getTokenData(
          type,
          linkTokenAddress,
          tokenId,
          Number(linkChainId),
          provider,
          dispatch
        )
        if (campaignId === "1719334012456") {

          alert('GET_INITIAL_DATA_4')
        }
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
        if (campaignId === "1719334012456") {

          alert('GET_INITIAL_DATA_5')
        }
        const status = await sdk?.getLinkStatus(claimCode)
        if (status?.txHash) {
          dispatch(actionsDrop.setHash(status.txHash))
        }
        if (campaignId === "1719334012456") {

          alert('GET_INITIAL_DATA_6')
        }
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
      
      if (campaignId === "1719334012456") {
        alert('ERROR2')
        alert(error.statusCode)
        alert(error.status)
        alert(error.code)
        alert(error.message)
      }
      console.log(error, error.statusCode)
    }
  }
}
