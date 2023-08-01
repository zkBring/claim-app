const defineRealNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'Mainnet'
    case 5: return 'Goerli'
    case 137: return 'Polygon'
    case 80001: return 'Mumbai'
    case 8453: return 'Base'
    case 84531: return 'Base Goerli'
    default: return 'Mainnet'
  }
}

export default defineRealNetworkName
