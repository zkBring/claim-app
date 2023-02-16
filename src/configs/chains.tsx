const { REACT_APP_INFURA_ID } = process.env

type TChains = {
  [chainId: number]: {
    chainName: string,
    displayName: string,
    nativeCurrency: {
      name: string,
      symbol: string,
      decimals: number
    },
    rpcUrls: string[],
    blockExplorerUrls: string[]
  }
}

const chains: TChains = {
  137: {
    chainName: 'Polygon',
    displayName: 'Polygon',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://poly-rpc.gateway.pokt.network/'
    ],
    blockExplorerUrls: [
      'https://polygonscan.com'
    ]
  },
  1: {
    chainName: 'Ethereum Mainnet',
    displayName: 'Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: [
      `https://mainnet.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://etherscan.io'
    ]
  },
  5: {
    chainName: 'Goerli',
    displayName: 'Goerli',
    nativeCurrency: {
      name: 'GoerliETH',
      symbol: 'GoerliETH',
      decimals: 18
    },
    rpcUrls: [
      `https://goerli.infura.io/v3/${REACT_APP_INFURA_ID}`
    ],
    blockExplorerUrls: [
      'https://goerli.etherscan.io'
    ]
  },
  80001: {
    chainName: 'Mumbai',
    displayName: 'Mumbai',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: [
      'https://endpoints.omniatech.io/v1/matic/mumbai/public'
    ],
    blockExplorerUrls: [
      'https://mumbai.polygonscan.com'
    ]
  }
}

export default chains