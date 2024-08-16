import { Dispatch } from 'redux'
import {
  UserActions
} from '../types'
import { IMetamaskError } from 'types'
import {
  toHex,
  alertError
} from 'helpers'
import chains from 'configs/chains'
import { IAppDispatch, RootState } from 'data/store'
import * as actions from '../actions'

function switchNetwork (
  chainId: number,
  callback?: () => void
) {
  return async (
    dispatch: Dispatch<UserActions> & IAppDispatch,
    getState: () => RootState
  ) => {
    dispatch(actions.setLoading(true))
    const { user: {
      userProvider
    } } = getState()
  
    if (!chainId) {
      return alertError('Current chain ID is not provided')
    }
    try {
      const request = await userProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: toHex(chainId)
        }],
      })
      callback && callback()
    } catch (err) {
      console.log({ err })
        const switchError = err as IMetamaskError
        if (switchError.code) {
          try {
            const chainObj = chains[chainId]
            if (chainObj) {
              const data = {
                chainName: chainObj.chainName,
                nativeCurrency: chainObj.nativeCurrency,
                rpcUrls: chainObj.rpcUrls,
                blockExplorerUrls: chainObj.blockExplorerUrls,
                chainId: toHex(chainId)
              }
  
              await userProvider.request({
                method: 'wallet_addEthereumChain',
                params: [data],
              })
              callback && callback()
            }
          } catch (err) {
            alertError('Check console for more information')
            console.error({ err })
            // handle "add" error
          }
        }    
    }
    dispatch(actions.setLoading(false))

  }
}

export default switchNetwork