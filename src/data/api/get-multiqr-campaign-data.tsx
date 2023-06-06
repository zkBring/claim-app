import axios, { AxiosResponse } from 'axios'
import { TMultiscanCampaign } from 'types'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

type TGetMultiQRCampaignResponse = {
  success: boolean
  campaign: TMultiscanCampaign
}

export type TGetMultiQRCampaignData = (
  multiscanQRId: string
) => Promise<
  AxiosResponse<
    TGetMultiQRCampaignResponse
  >
>

const getMultiQRCampaignData: TGetMultiQRCampaignData = (
  multiscanQRId
) => {
  return axios.get(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/multiscan-qrs/${multiscanQRId}/campaign`)
}

export default getMultiQRCampaignData
