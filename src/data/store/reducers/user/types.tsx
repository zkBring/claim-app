import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import LinkdropBatchSDK from 'linkdrop-batch-sdk'

export interface UserState {
  address: string
  loading: boolean
  chainId: number | null
  sdk: LinkdropBatchSDK | null
  initialized: boolean
  userProvider: any
  signer: any
  provider: any
  hasConnector: boolean
  email?: string
}

export type UserActions = ActionType<typeof actions>