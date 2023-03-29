import axios from 'axios'
import { defineServerUrl } from 'helpers'

const getLastTxHash = (
  chainId: number,
  linkdropMasterAddress: string,
  linkId: string
) => {
  return axios(`${defineServerUrl(Number(chainId))}/api/v2/linkdrops/getLastTxHash/${linkdropMasterAddress}/${linkId}`)
}

export default getLastTxHash
