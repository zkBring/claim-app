import defineNetworkName from './define-network-name'

type TDefineNFTExplorerUrl = ({
  chainId,
  tokenId,
  tokenAddress
}: {
  chainId: number,
  tokenId: string,
  tokenAddress: string
}) => string | null

const defineOpenseaURL: TDefineNFTExplorerUrl = ({ chainId, tokenId, tokenAddress }) => {
  const networkName = defineNetworkName(chainId)
  if (networkName === 'mainnet') {
    return `https://opensea.io/assets/${tokenAddress}/${tokenId}`
  }
  if (networkName === 'polygon') {
    return `https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`
  }
  return null
}

export default defineOpenseaURL