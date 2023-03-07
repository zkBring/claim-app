import { Dispatch } from 'redux';
import * as actions from '../actions';
import { UserActions } from '../types';
import contracts from 'configs/contracts'
import { RootState } from 'data/store'
import { ethers } from 'ethers'
import checkIfClaimed from '../../drop/async-actions/check-if-claimed'
import { getLastTxHash } from 'data/api'
import * as actionsDrop from '../../drop/actions'
import { DropActions } from '../../drop/types'
import {
  defineJSONRpcUrl,
} from 'helpers'
const { REACT_APP_INFURA_ID } = process.env

class StaticJsonRpcProvider extends ethers.providers.JsonRpcProvider {
  async getNetwork(): Promise<any> {
      if (this._network) { return Promise.resolve(this._network); }
      return super.getNetwork();
  }
}

const initialize = (
  onReload: () => void,
  address?: string,
  chainId?: number,
  userProvider?: any
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>,
    getState: () => RootState
  ) => {
    

    dispatch(actions.setInitialized(false))

    const {
      drop: {
        chainId: linkChainId,
        campaignId,
        linkdropMasterAddress,
        linkId
      }
    } = getState()

    if (!campaignId) {
      
      return onReload && onReload() 
    }

    if (!REACT_APP_INFURA_ID) {
      return alert('REACT_APP_INFURA_ID is not provided in .env file')
    }

    if (!linkChainId) {
      return alert('chainId of link is not provided in store')
    }

    if (!linkId) {
      return alert('linkId of link is not provided in store')
    }

    if (!linkdropMasterAddress) {
      return alert('linkdropMasterAddress of link is not provided in store')
    }

    if (!campaignId) {
      return alert('campaignId of link is not provided in store')
    }

    const jsonRpcUrl = defineJSONRpcUrl({ chainId: Number(linkChainId), infuraPk: REACT_APP_INFURA_ID })
    const contract = contracts[linkChainId]
    const provider = new StaticJsonRpcProvider(jsonRpcUrl)
    dispatch(actions.setProvider(provider))

    const claimed = await checkIfClaimed(
      provider,
      Number(linkChainId),
      linkId,
      linkdropMasterAddress,
      campaignId
    )

    if (claimed) {
      try {
        const latestTxHash = await getLastTxHash(Number(linkChainId), linkdropMasterAddress, linkId)
        if (latestTxHash.data.txHash) {
          dispatch(actionsDrop.setHash(latestTxHash.data.txHash))
        }
      } catch (err) {
        console.log({ err })
      }
      dispatch(actionsDrop.setIsClaimed(claimed))
    }

    if (!chainId || !address) {
      dispatch(actions.setHasConnector(false))
    } else {
      dispatch(actions.setHasConnector(true))
      dispatch(actions.setAddress(address))
      dispatch(actions.setChainId(chainId))
      dispatch(actions.setUserProvider(userProvider))
    }

    if (!contract) {
      return dispatch(actions.setInitialized(true))
    }
    dispatch(actions.setInitialized(true))
  }
}

export default initialize