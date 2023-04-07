import { Alchemy } from 'alchemy-sdk'
import { defineAlchemyNetwork } from 'helpers'
const { REACT_APP_ALCHEMY_API_KEY } = process.env

const createAlchemyInstance = (chainId: number | null) : Alchemy | void => {
  const alchemyNetwork = defineAlchemyNetwork(chainId)
  if (!alchemyNetwork) {
    return 
  }
  const alchemy = new Alchemy({
    apiKey: REACT_APP_ALCHEMY_API_KEY,
    network: alchemyNetwork
  })

  return alchemy
}

export default createAlchemyInstance