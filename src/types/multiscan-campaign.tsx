import { TDropType, TWalletName } from "./"

type TMultiscanCampaign = {
  title: string
  token_address: string
  token_standard: TDropType
  sponsored: boolean
  wallet: TWalletName
  chain_id: number
  only_preferred_wallet: boolean
  campaign_number: string | number
}
export default TMultiscanCampaign