import { Dispatch } from 'redux';
import * as actions from '../actions';
import { UserActions } from '../types';
import LinkdropSDK from '@linkdrop/sdk'
import contracts from 'configs/contracts'
import {
  defineServerUrl,
  getHashVariables,
} from 'helpers'
import { ethers } from 'ethers'
import checkIfClaimed from '../../drop/async-actions/check-if-claimed'
import { getLastTxHash } from 'data/api'
import * as actionsDrop from '../../drop/actions'
import { DropActions } from '../../drop/types'

import {
  defineNetworkName,
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
  address?: string,
  chainId?: number,
  userProvider?: any
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>
  ) => {
    let hashParamsVariables = getHashVariables()

    const linkChainId = hashParamsVariables.chainId
    const linkdropMasterAddress = hashParamsVariables.linkdropMasterAddress
    const campaignId = hashParamsVariables.campaignId
    const linkKey = hashParamsVariables.linkKey

    dispatch(actions.setInitialized(false))

    if (!REACT_APP_INFURA_ID) {
      return alert('REACT_APP_INFURA_ID is not provided in .env file')
    }

    const jsonRpcUrl = defineJSONRpcUrl({ chainId: Number(linkChainId), infuraPk: REACT_APP_INFURA_ID })
    const networkName = defineNetworkName(Number(linkChainId))
    const contract = contracts[linkChainId]
    const provider = new StaticJsonRpcProvider(jsonRpcUrl)
    dispatch(actions.setProvider(provider))

    const linkWallet = await new ethers.Wallet(linkKey, provider)
    const linkId = linkWallet.address
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

    const apiHost = defineServerUrl(Number(linkChainId))
    console.log({
      apiHost
    })
    const sdk = new LinkdropSDK({
      factoryAddress: contract.factory,
      chain: networkName,
      linkdropMasterAddress,
      jsonRpcUrl,
      apiHost
    })

    dispatch(actions.setSDK(sdk)) 
    
    dispatch(actions.setInitialized(true))
  }
}

export default initialize