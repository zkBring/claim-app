import defineNetworkName from './define-network-name'
type TDefineOpenseaURL = (
  chainId: number,
  tokenAddress: string | null,
  tokenId: string | null
) => string | undefined

const defineOpenseaURL: TDefineOpenseaURL = (
  chainId,
  tokenAddress,
  tokenId
) => {
  if (tokenId === null || tokenId === undefined) {
    return
  }
  const networkName = defineNetworkName(chainId)
  if (networkName === 'mainnet') {
    return `https://opensea.io/assets/${tokenAddress}/${tokenId}`
  }
  if (networkName === 'matic') {
    return `https://opensea.io/assets/matic/${tokenAddress}/${tokenId}`
  }
  return `https://testnets.opensea.io/assets/${networkName}/${tokenAddress}/${tokenId}`
}

export default defineOpenseaURL