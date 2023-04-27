import { action } from 'typesafe-actions';
import { Constants } from './constants';
import { TDropStep, TDropType, TTheme, TDropError, TWalletName } from 'types'

export function setStep(step: TDropStep) {
  return action(Constants.DROP_SET_STEP, { step })
}

export function setLoading(loading: boolean) {
  return action(Constants.DROP_SET_LOADING, { loading })
}

export function setChainId(chainId: number) {
  return action(Constants.DROP_SET_CHAIN_ID, { chainId })
}

export function setTokenAddress(tokenAddress: string) {
  return action(Constants.DROP_SET_TOKEN_ADDRESS, { tokenAddress })
}

export function setAmount (amount: string) {
  return action(Constants.DROP_SET_AMOUNT, { amount })
}

export function setTitle (title: string) {
  return action(Constants.DROP_SET_TITLE, { title })
}

export function setTokenId (tokenId: string) {
  return action(Constants.DROP_SET_TOKEN_ID, { tokenId })
}

export function setHash (hash: string) {
  return action(Constants.DROP_SET_HASH, { hash })
}

export function setType (type: TDropType) {
  return action(Constants.DROP_SET_TYPE, { type })
}

export function setWallet (wallet: string) {
  return action(Constants.DROP_SET_WALLET, { wallet })
}

export function setLinkdropMasterAddress (linkdropMasterAddress: string) {
  return action(Constants.DROP_SET_LINKDROP_MASTER_ADDRESS, { linkdropMasterAddress })
}

export function setLinkdropSignerSignature (linkdropSignerSignature: string) {
  return action(Constants.DROP_SET_LINKDROP_SIGNER_SIGNATURE, { linkdropSignerSignature })
}

export function setIsManual (isManual: boolean) {
  return action(Constants.DROP_SET_IS_MANUAL, { isManual })
}

export function setExpirationTime (expirationTime: string) {
  return action(Constants.DROP_SET_EXPIRATION_TIME, { expirationTime })
}

export function setCampaignId (campaignId: string) {
  return action(Constants.DROP_SET_CAMPAIGN_ID, { campaignId })
}

export function setWeiAmount (weiAmount: string) {
  return action(Constants.DROP_SET_WEI_AMOUNT, { weiAmount })
}

export function setLinkKey (linkKey: string) {
  return action(Constants.DROP_SET_LINK_KEY, { linkKey })
}

export function setIsClaimed (isClaimed: boolean) {
  return action(Constants.DROP_SET_IS_CLAIMED, { isClaimed })
}

export function setAddressIsManuallySet (addressIsManuallySet: boolean) {
  return action(Constants.DROP_SET_ADDRESS_MANUALLY_SET, { addressIsManuallySet })
}

export function setWalletApp (walletApp: TWalletName) {
  return action(Constants.DROP_SET_WALLET_APP, { walletApp })
}

export function setTheme (theme: TTheme) {
  return action(
    Constants.DROP_SET_THEME,
    {
      theme
    }
  )
}

export function setError (error: TDropError | null) {
  return action(
    Constants.DROP_SET_ERROR,
    {
      error
    }
  )
}

export function setClaimCode (claimCode: string) {
  return action(
    Constants.DROP_SET_CLAIM_CODE,
    {
      claimCode
    }
  )
}

export function setLinkId (linkId: string) {
  return action(
    Constants.DROP_SET_LINK_ID,
    {
      linkId
    }
  )
}

export function setClaimingFinishedDescription (claiming_finished_description: string) {
  return action(
    Constants.DROP_SET_CLAIMING_FINISHED_DESCRIPTION,
    {
      claiming_finished_description
    }
  )
}

export function setClaimingFinishedButtonTitle (claiming_finished_button_title: string) {
  return action(
    Constants.DROP_SET_CLAIMING_FINISHED_BUTTON_TITLE,
    {
      claiming_finished_button_title
    }
  )
}

export function setClaimingFinishedButtonURL (claiming_finished_button_url: string) {
  return action(
    Constants.DROP_SET_CLAIMING_FINISHED_BUTTON_URL,
    {
      claiming_finished_button_url
    }
  )
}


