import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import { TDropStep, TDropType, TTheme, TDropError } from 'types'

export interface DropState {
  step: TDropStep,
  loading: boolean,
  chainId: number | null,
  tokenAddress: string | null,
  tokenId: string | null,
  amount: string | null,
  hash: null | string,
  type: TDropType | null,
  title: string | null,
  isClaimed: boolean,


  wallet: string | null,
  expirationTime: string | null,
  linkKey: string | null,
  linkdropMasterAddress: string | null,
  linkdropSignerSignature: string | null,
  campaignId: string | null,
  isManual: boolean,
  version: string | null,
  weiAmount: string | null,
  error: null | TDropError,

  autoClaim: boolean,
  theme: TTheme,
  redirectToOnboarding: boolean,
  addressIsManuallySet: boolean
}



export type DropActions = ActionType<typeof actions>;