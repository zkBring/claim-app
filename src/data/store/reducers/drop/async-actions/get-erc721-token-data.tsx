import { ERC721Contract } from 'abi'
import { getERC721TokenData } from 'data/api'
import { ethers } from 'ethers'
import { IPFSRedefineUrl } from 'helpers'
import tokenPlaceholder from 'images/token-placeholder.png'
import { getValidImage } from 'helpers'

type TTokenERC721Data = { name: string, image: string, description: string }
type TGetTokenERC721Data = (provider: any, tokenAddress: string, tokenId: string) => Promise<TTokenERC721Data>

const getTokenData: TGetTokenERC721Data = async (provider, tokenAddress, tokenId ) => {
  if (tokenAddress.toLocaleLowerCase() === '0xfe399e9a4b0be4087a701ff0b1c89dabe7ce5425') {
    return {
      name: 'Infinity Pass', description: ''
    }
  }
  try {
    const contractInstance = await new ethers.Contract(tokenAddress, ERC721Contract, provider)
    let actualUrl = await contractInstance.tokenURI(tokenId)
    actualUrl = IPFSRedefineUrl(actualUrl, tokenId)
    const tokenData = await getERC721TokenData(actualUrl)
    const image = await getValidImage(tokenData.data.image)
    console.log({
      ...tokenData.data,
      image
    })
    return {
      ...tokenData.data,
      image
    }
  } catch (e) {
    // @ts-ignore
    // alert(Object.values(e).join(', '))
    console.log({ e })
    return { name: 'ERC721', image: tokenPlaceholder, description: '' }
  }
}

export default getTokenData