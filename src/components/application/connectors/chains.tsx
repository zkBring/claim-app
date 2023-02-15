import type { AddEthereumChainParameter } from '@web3-react/types'
const { REACT_APP_INFURA_ID } = process.env

interface BasicChainInformation {
  urls: (string | undefined)[]
  name: string
}
interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }
const infuraUrl = (network: string) => REACT_APP_INFURA_ID ? `https://${network}.infura.io/v3/${REACT_APP_INFURA_ID}` : undefined



export const MAINNET_CHAINS: ChainConfig = {
  137: {
    urls: [infuraUrl('polygon-mainnet'), 'https://polygon-rpc.com'].filter(Boolean),
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  }
}