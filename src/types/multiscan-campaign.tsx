import { TDropType, TWalletName, TPreviewSetting } from "./"

type TMultiscanCampaign = {
  title: string
  token_address: string
  token_standard: TDropType
  sponsored: boolean
  wallet: TWalletName
  chain_id: number
  only_preferred_wallet: boolean
  campaign_number: string | number
  token_id: string
  preview_setting?: TPreviewSetting
  token_amount: string
}
export default TMultiscanCampaign