import { TokenState, TokenActions } from './types';
import { Constants } from './constants';

const initialState: TokenState = {
  loading: false,
  name: '',
  description: '',
  image: null,
  decimals: 0,
  linkdropToken: false
};

export function tokenReducer(
  state: TokenState = initialState,
  action: TokenActions
): TokenState {
    switch (action.type) {
        case Constants.TOKEN_SET_NAME:
          return {...state, name: action.payload.name }
        case Constants.TOKEN_SET_DESCRIPTION:
          return {...state, description: action.payload.description }
        case Constants.TOKEN_SET_LINKDROP_TOKEN:
          return {...state, linkdropToken: action.payload.linkdropToken }
        case Constants.TOKEN_SET_IMAGE:
          return {...state, image: action.payload.image }
        case Constants.TOKEN_SET_DECIMALS:
          return {...state, decimals: action.payload.decimals }
        default:
            return state;
    }
}