import { ERC721Contract } from 'abi'
import { getERC721TokenData } from 'data/api'
import { ethers } from 'ethers'
import tokenPlaceholder from 'images/token-placeholder.png'
import { getValidImage, getAlchemyTokenImage, createAlchemyInstance, IPFSRedefineUrl } from 'helpers'

type TTokenERC721Data = { name: string, image: string, description: string }
type TGetTokenERC721Data = (provider: any, tokenAddress: string, tokenId: string, chainId: number | null) => Promise<TTokenERC721Data>

const getTokenData: TGetTokenERC721Data = async (provider, tokenAddress, tokenId, chainId) => {
  try {
    const alchemy = createAlchemyInstance(chainId)
    if (!alchemy) {
      throw new Error('No Alchemy instance is created')
    }
    const tokenData = await alchemy.nft.getNftMetadata(tokenAddress, tokenId)
    const image = await getAlchemyTokenImage(tokenData)
    return { name: tokenData.title || 'ERC721 Token', image, description: tokenData.description }
  } catch (err) {
    try {
      const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract, provider)
      let actualUrl = await contractInstance.tokenURI(tokenId)
      actualUrl = IPFSRedefineUrl(actualUrl, tokenId)
      const tokenData = await getERC721TokenData(actualUrl)
      const image = await getValidImage(tokenData.data.animation_url || tokenData.data.image)
      return {
        ...tokenData.data,
        image
      }
    } catch (e) {
      // @ts-ignore
      // alert(Object.values(e).join(', '))
      console.log({ e })
      return { name: 'ERC721 Token', image: tokenPlaceholder, description: '' }
    }
  }
}

export default getTokenData