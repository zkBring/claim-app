import defineNetworkName from './define-network-name'
import chains from 'configs/chains'

type TDefineExplorerURL = (chainId: number) => string

const defineExplorerUrl: TDefineExplorerURL = (chainId) => {
  const chainConfig =  chains[chainId]
  if (chainConfig) {
    const { blockExplorerUrls } = chainConfig
    if (blockExplorerUrls) {
      const explorerURL = blockExplorerUrls[0]
      if (explorerURL) { return explorerURL }
    }
  }
  const networkName = defineNetworkName(chainId)
  return `https://${networkName}.etherscan.io` 
}

export default defineExplorerUrl