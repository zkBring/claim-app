import { ERC20Contract } from 'abi'
import { ethers } from 'ethers'
import tokenSymbol from 'images/erc20-token-placeholder.png'
import { createAlchemyInstance } from 'helpers'
import { TTokenERC20Data } from 'types'

type TGetTokenERC20Data = (provider: any, tokenAddress: string, chainId: number | null) => Promise<TTokenERC20Data>
const getTokenData: TGetTokenERC20Data = async (provider, tokenAddress, chainId) => {
  try {
    const alchemy = createAlchemyInstance(chainId)
    if (!alchemy) {
      throw new Error('No Alchemy instance is created')
    }
    const tokenData = await alchemy.core.getTokenMetadata(tokenAddress)
    return { symbol: tokenData.symbol || 'ERC20 Token', decimals: tokenData.decimals, description: '', image: tokenData.logo || tokenSymbol } 
  } catch (err) {
    try {
      const contractInstance = await new ethers.Contract(tokenAddress, ERC20Contract, provider)
      let symbol = await contractInstance.symbol()
      let decimals = await contractInstance.decimals()
      const image = await getImage(tokenAddress)
      return {
        symbol,
        decimals,
        description: '',
        image
      }
    } catch (err) {
      // @ts-ignore
      console.log({ err })
      return { symbol: 'ERC20 Token', decimals: 18, description: '', image: tokenSymbol }
    }
  }  
}

const getImage = async (tokenAddress: string) => {
  return tokenSymbol
}

export default getTokenData