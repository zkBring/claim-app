import { DropState, DropActions } from './types';
import { Constants } from './constants';

const initialState: DropState = {
  step: 'short_code_loading',
  multiscanStep: 'not_initialized',
  loading: false,
  chainId: null,
  tokenAddress: null,
  tokenId: null,
  amount: null,
  autoclaim: false,
  hash: null,
  type: null,
  title: null,
  error: null,
  wallet: null,
  expirationTime: null,
  linkKey: null,
  linkdropMasterAddress: null,
  linkdropSignerSignature: null,
  campaignId: null,
  isManual: false,
  version: null,
  weiAmount: null,
  isClaimed: false,
  theme: 'dark',
  addressIsManuallySet: false,
  claimCode: null,
  linkId: null,
  claiming_finished_description: '',
  claiming_finished_button_title: '',
  claiming_finished_button_url: '',
  claiming_finished_auto_redirect: false,
  walletApp: null,
  previewSetting: undefined,
  whitelistType: null,
  whitelistOn: false,
  multiscanLinkDecrypted: null,
  preferredWalletOn: false,
  additionalWalletsOn: false,
  factoryAddress: null
}

export function dropReducer(
  state: DropState = initialState,
  action: DropActions
): DropState {
    switch (action.type) {
      case Constants.DROP_SET_STEP:
        return {...state, step: action.payload.step }
      case Constants.DROP_SET_FACTORY_ADDRESS:
        return {...state, factoryAddress: action.payload.factoryAddress }
      case Constants.DROP_SET_AUTOCLAIM:
        return {...state, autoclaim: action.payload.autoclaim }
      case Constants.DROP_SET_MULTISCAN_STEP:
        return {...state, multiscanStep: action.payload.multiscanStep }
      case Constants.DROP_SET_CHAIN_ID:
        return {...state, chainId: action.payload.chainId }
      case Constants.DROP_SET_TOKEN_ADDRESS:
        return {...state, tokenAddress: action.payload.tokenAddress }
      case Constants.DROP_SET_AMOUNT:
          return {...state, amount: action.payload.amount }
      case Constants.DROP_SET_TITLE:
          return {...state, title: action.payload.title }
      case Constants.DROP_SET_TOKEN_ID:
        return {...state, tokenId: action.payload.tokenId }
      case Constants.DROP_SET_HASH:
        return {...state, hash: action.payload.hash }
      case Constants.DROP_SET_IS_MANUAL:
        return {...state, isManual: action.payload.isManual }
      case Constants.DROP_SET_CAMPAIGN_ID:
        return {...state, campaignId: action.payload.campaignId }
      case Constants.DROP_SET_TYPE:
        return {...state, type: action.payload.type }
      case Constants.DROP_SET_LINK_KEY:
        return {...state, linkKey: action.payload.linkKey }
      case Constants.DROP_SET_EXPIRATION_TIME:
        return {...state, expirationTime: action.payload.expirationTime }
      case Constants.DROP_SET_LINKDROP_MASTER_ADDRESS:
        return {...state, linkdropMasterAddress: action.payload.linkdropMasterAddress }
      case Constants.DROP_SET_LINKDROP_SIGNER_SIGNATURE:
        return {...state, linkdropSignerSignature: action.payload.linkdropSignerSignature }
      case Constants.DROP_SET_WALLET:
        return {...state, wallet: action.payload.wallet }
      case Constants.DROP_SET_WEI_AMOUNT:
        return {...state, weiAmount: action.payload.weiAmount }
      case Constants.DROP_SET_PREVIEW_SETTING:
        return {...state, previewSetting: action.payload.previewSetting }
      case Constants.DROP_SET_MULTISCAN_WHITELIST_ON:
        return {...state, whitelistOn: action.payload.whitelist_on }
      case Constants.DROP_SET_MULTISCAN_WHITELIST_TYPE:
        return {...state, whitelistType: action.payload.whitelist_type }
      case Constants.DROP_SET_IS_CLAIMED:
        return {...state, isClaimed: action.payload.isClaimed }
      case Constants.DROP_SET_ADDITIONAL_WALLETS_ON: 
        return {...state, additionalWalletsOn: action.payload.additionalWalletsOn }
      case Constants.DROP_SET_LOADING:
        return {...state, loading: action.payload.loading }
      case Constants.DROP_SET_ERROR:
        return {...state, error: action.payload.error }
      case Constants.DROP_SET_ADDRESS_MANUALLY_SET:
        return {...state, addressIsManuallySet: action.payload.addressIsManuallySet }
      case Constants.DROP_SET_LINK_ID:
        return {...state, linkId: action.payload.linkId }
      case Constants.DROP_SET_CLAIMING_FINISHED_DESCRIPTION:
        return {...state, claiming_finished_description: action.payload.claiming_finished_description }
      case Constants.DROP_SET_CLAIMING_FINISHED_BUTTON_TITLE:
        return {...state, claiming_finished_button_title: action.payload.claiming_finished_button_title }
      case Constants.DROP_SET_CLAIMING_FINISHED_BUTTON_URL:
        return {...state, claiming_finished_button_url: action.payload.claiming_finished_button_url }
      case Constants.DROP_SET_CLAIMING_FINISHED_AUTO_REDIRECT:
        return {...state, claiming_finished_auto_redirect: action.payload.claiming_finished_auto_redirect }
      case Constants.DROP_SET_WALLET_APP:
        return {...state, walletApp: action.payload.walletApp }
      case Constants.DROP_SET_CLAIM_CODE:
        return {...state, claimCode: action.payload.claimCode }
      case Constants.DROP_SET_PREFERRED_WALLET_ON:
        return {...state, preferredWalletOn: action.payload.preferredWalletOn }
      case Constants.DROP_SET_MULTISCAN_LINK_DECRYPTED:
        return {...state, multiscanLinkDecrypted: action.payload.multiscanLinkDecrypted }

      case Constants.DROP_SET_THEME:
        return {...state, theme: action.payload.theme }
      default:
          return state;
    }
}