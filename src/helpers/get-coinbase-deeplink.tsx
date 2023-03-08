import { defineNetworkName } from 'helpers'
import { getCoinbaseDeeplinkApi } from 'data/api'

type TGetCoinbaseDeeplink = (chainId: number, url: string) => Promise<string | null | undefined>

const getCoinbaseDeeplink: TGetCoinbaseDeeplink = async (chainId, url) => {
  try {
    const networkName = defineNetworkName(chainId)
    const { data: { success, link } } = await getCoinbaseDeeplinkApi(networkName, url)
    if (success) {
    	return link
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export default getCoinbaseDeeplink
