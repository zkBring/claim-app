import { ActionType } from 'typesafe-actions';
import * as actions from './actions'
import {
  TDropStep,
  TDropType,
  TTheme,
  TDropError,
  TWalletName,
  TMultiscanStep,
  TPreviewSetting
} from 'types'

export interface DropState {
  step: TDropStep
  multiscanStep: TMultiscanStep
  loading: boolean
  chainId: number | null
  tokenAddress: string | null
  tokenId: string | null
  amount: string | null
  hash: null | string
  type: TDropType | null
  title: string | null
  isClaimed: boolean
  wallet: TWalletName | null
  expirationTime: string | null
  linkKey: string | null
  linkdropMasterAddress: string | null
  linkdropSignerSignature: string | null
  campaignId: string | null
  isManual: boolean
  version: string | null
  weiAmount: string | null
  error: null | TDropError
  theme: TTheme
  addressIsManuallySet: boolean
  claimCode: string | null
  linkId: string | null
  claiming_finished_description: string
  claiming_finished_button_title: string
  claiming_finished_button_url: string
  walletApp: null | TWalletName
  availableWallets: string[]
  previewSetting?: TPreviewSetting
}



export type DropActions = ActionType<typeof actions>;