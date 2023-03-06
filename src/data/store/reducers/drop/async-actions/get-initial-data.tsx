
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import * as actionsToken from '../../token/actions'
import * as asyncActionsUser from '../../user/async-actions'
import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import getERC1155Data from './get-erc1155-token-data'
import getERC721Data from './get-erc721-token-data'
import getERC20Data from './get-erc20-token-data'
import { RootState, IAppDispatch } from 'data/store'

export default function getData(
  onReload: () => void,
  userAddress?: string,
  userChainId?: number,
  userProvider?: any
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    
    try {
      dispatch(actionsDrop.setLoading(true))
      dispatch(actionsDrop.setStep('loading'))
      await dispatch(asyncActionsUser.initialize(
        onReload,
        userAddress,
        userChainId,
        userProvider
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
          amount
        }
      } = getState()
      
  
      if (tokenId && amount && linkTokenAddress) {
        const { name, image, description } = await getERC1155Data(provider, linkTokenAddress, tokenId)
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (tokenId && !amount && linkTokenAddress) {
        const { name, image, description } = await getERC721Data(provider, linkTokenAddress, tokenId)
        dispatch(actionsDrop.setTokenId(tokenId))
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (amount && !tokenId && linkTokenAddress) {
        const { symbol, decimals, image } = await getERC20Data(provider, linkTokenAddress)
        dispatch(actionsToken.setName(symbol))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setDecimals(decimals))
      }

      if (Number(expirationTime) < +new Date()) {
        dispatch(actionsDrop.setLoading(false))
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

      if (userChainId && Number(userChainId) !== Number(linkChainId)) {
        dispatch(actionsDrop.setLoading(false))
        return dispatch(actionsDrop.setStep('change_network'))
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
