import axios from 'axios'
import { defineServerUrl } from 'helpers'

const getLastTxHash = (
  chainId: number,
  linkdropMasterAddress: string,
  linkId: string
) => {
  return axios(`${defineServerUrl(Number(chainId))}/api/v1/linkdrops/getLastTxHash/${linkdropMasterAddress}/${linkId}`)
}

export default getLastTxHash
