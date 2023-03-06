import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import { TAccount } from 'types'
import LinkdropSDK from 'linkdrop-sdk'

export interface UserState {
  address: string
  loading: boolean
  chainId: number | null
  sdk: LinkdropSDK | null
  initialized: boolean
  userProvider: any
  provider: any
  hasConnector: boolean
  account: TAccount | null
}

export type UserActions = ActionType<typeof actions>