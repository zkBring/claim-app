const defineRealNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'Mainnet'
    case 13371: return 'Immutable Zkevm'
    case 137: return 'Polygon'
    case 8453: return 'Base'
    default: return 'Mainnet'
  }
}

export default defineRealNetworkName
