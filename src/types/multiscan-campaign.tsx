import { TDropType, TWalletName, TPreviewSetting, TWhitelistType } from "./"

type TMultiscanCampaign = {
  title: string
  token_address: string
  token_standard: TDropType
  sponsored: boolean
  wallet: TWalletName
  chain_id: number
  campaign_number: string | number
  token_id: string
  preview_setting?: TPreviewSetting
  token_amount: string
  redirect_url: string
  redirect_on: string
  whitelist_on: boolean
  whitelist_type: TWhitelistType
  preferred_wallet_on?: boolean
}
export default TMultiscanCampaign