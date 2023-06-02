
import { Dispatch } from 'redux'
import * as actionsDrop from '../actions'
import * as actionsToken from '../../token/actions'
import { DropActions } from '../types'
import { TokenActions } from '../../token/types'
import { UserActions } from '../../user/types'
import getERC1155Data from './get-erc1155-token-data'
import getERC721Data from './get-erc721-token-data'
import getERC20Data from './get-erc20-token-data'
import { IAppDispatch } from 'data/store'
import { TDropType } from 'types'

export default function getTokenData(
  tokenType: TDropType,
  tokenAddress: string,
  tokenId: string | null,
  chainId: number,
  provider: any
) {
  return async (
    dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & Dispatch<UserActions> & IAppDispatch
  ) => {
    
    try {
      if (tokenType === 'ERC1155' && tokenAddress && tokenId) {
        const { name, image, description } = await getERC1155Data(provider, tokenAddress, tokenId, chainId)
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (tokenType === 'ERC721' && tokenAddress && tokenId) {
        const { name, image, description } = await getERC721Data(provider, tokenAddress, tokenId, chainId)
        dispatch(actionsDrop.setTokenId(tokenId))
        dispatch(actionsToken.setDescription(description))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setName(name))
      }

      if (tokenType === 'ERC20' && tokenAddress) {
        const { symbol, decimals, image } = await getERC20Data(provider, tokenAddress, chainId)
        dispatch(actionsToken.setName(symbol))
        dispatch(actionsToken.setImage(image))
        dispatch(actionsToken.setDecimals(decimals))
      }
    } catch (
      error: any
    ) {
      console.log(error, error.statusCode)
    }
  }
}
