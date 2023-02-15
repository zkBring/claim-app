import axios from 'axios'
import { metadataUrlResolve } from 'helpers'

const getERC1155TokenData = (url: string, tokenId: string) => {
  const tokenDataURL = url.replace('0x{id}', tokenId)
  return axios(metadataUrlResolve(tokenDataURL, tokenId))
}

export default getERC1155TokenData
