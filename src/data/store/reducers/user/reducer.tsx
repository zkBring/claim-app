import { UserState, UserActions } from './types';
import { Constants } from './constants';

const initialState: UserState = {
  address: '',
  loading: false,
  provider: null,
  userProvider: null,
  chainId: null,
  sdk: null,
  initialized: false,
  hasConnector: false,
  account: null,
  signer: null
};

export function userReducer(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case Constants.USER_SET_ADDRESS:
      return { ...state, address: action.payload.address }
    case Constants.USER_SET_LOADING:
      return {...state, loading: action.payload.loading }
    case Constants.USER_SET_PROVIDER:
      return {...state, provider: action.payload.provider }
    case Constants.USER_SET_USER_PROVIDER:
      return {...state, userProvider: action.payload.userProvider }
    case Constants.USER_SET_CHAIN_ID:
      return {...state, chainId: action.payload.chainId }
    case Constants.USER_SET_SDK:
      return {...state, sdk: action.payload.sdk }
    case Constants.USER_SET_INITIALIZED:
      return {...state, initialized: action.payload.initialized }
    case Constants.USER_SET_HAS_CONNECTOR:
      return {...state, hasConnector: action.payload.hasConnector }
    case Constants.USER_SET_ACCOUNT:
      return {...state, account: action.payload.account }
    case Constants.USER_SET_SIGNER:
      return {...state, signer: action.payload.signer }
    default:
      return state;
  }
}