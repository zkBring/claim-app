import axios, { AxiosResponse } from 'axios'
const { REACT_APP_QR_SERVER_URL } = process.env

type TGetCoinbaseDeeplinkApi = (networkName: string, callbackUrl: string) => Promise<AxiosResponse<{ success: boolean, link: string }>>

const getCoinbaseDeeplinkApi: TGetCoinbaseDeeplinkApi = async (networkName, callbackUrl) => {
  return await axios(`https://${networkName}.linkdrop.io/api/v1/utils/get-coinbase-deeplink`, {
    method: 'POST',
    data: { url: callbackUrl }
  })
}

export default getCoinbaseDeeplinkApi
