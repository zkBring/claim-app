import { TDropType, TWalletName, TPreviewSetting } from "./"

type TMultiscanCampaign = {
  title: string
  token_address: string
  token_standard: TDropType
  sponsored: boolean
  wallet: TWalletName
  chain_id: number
  available_wallets: string[]
  campaign_number: string | number
  token_id: string
  preview_setting?: TPreviewSetting
  token_amount: string
}
export default TMultiscanCampaign