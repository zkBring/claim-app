import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TAccount } from 'types'

export interface UserState {
  address: string
  loading: boolean,
  chainId: number | null,
  sdk: any,
  initialized: boolean,
  userProvider: any,
  provider: any,
  accounts: TAccount[],
  hasConnector: boolean,
  account: TAccount | null
}

export type UserActions = ActionType<typeof actions>;