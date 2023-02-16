const defineRealNetworkName = (chainId: number | null) : string => {
  switch (chainId) {
    case 1: return 'Mainnet'
    case 3: return 'Ropsten'
    case 4: return 'Rinkeby'
    case 5: return 'Goerli'
    case 42: return 'Kovan'
    case 100: return 'XDAI'
    case 97: return 'BSC-testnet'
    case 56: return 'BSC'
    case 137: return 'Polygon'
    case 80001: return 'Mumbai'
    default: return 'Mainnet'
  }
}

export default defineRealNetworkName