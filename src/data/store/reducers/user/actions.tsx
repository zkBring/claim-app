import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TAccount } from 'types'

export function setAddress(address: string) {
  return action(
    Constants.USER_SET_ADDRESS,
    // payload
    {
      address
    }
  )
}

export function setLoading(loading: boolean) {
  return action(
    Constants.USER_SET_LOADING,
    // payload
    {
      loading
    }
  )
}

export function setSigner(signer: any) {
  return action(
    Constants.USER_SET_SIGNER,
    // payload
    {
      signer
    }
  )
}

export function setProvider(provider: any) {
  return action(
    Constants.USER_SET_PROVIDER,
    // payload
    {
      provider
    }
  )
}

export function setChainId(chainId: number) {
  return action(
    Constants.USER_SET_CHAIN_ID,
    // payload
    {
      chainId
    }
  )
}

export function setSDK(sdk: any) {
  return action(
    Constants.USER_SET_SDK,
    // payload
    {
      sdk
    }
  )
}

export function setInitialized(initialized: boolean) {
  return action(
    Constants.USER_SET_INITIALIZED,
    // payload
    {
      initialized
    }
  )
}

export function setHasConnector(hasConnector: boolean) {
  return action(
    Constants.USER_SET_HAS_CONNECTOR,
    // payload
    {
      hasConnector
    }
  )
}

export function setUserProvider(userProvider: any) {
  return action(
    Constants.USER_SET_USER_PROVIDER,
    // payload
    {
      userProvider
    }
  )
}


export function setEmail (email: string) {
  return action(
    Constants.USER_SET_EMAIL,
    // payload
    {
      email
    }
  )
}

