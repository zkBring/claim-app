import defineNetworkName from './define-network-name'
const {
  REACT_APP_API_URL_POLYGON,
  REACT_APP_API_URL_MAINNET,
  REACT_APP_API_URL_GOERLI,
  REACT_APP_API_URL_MUMBAI
} = process.env

type TDefineServerUrl = (chainId: number) => string

const defineServerUrl: TDefineServerUrl = (chainId) => {
  const networkName = defineNetworkName(chainId)
  if (networkName === 'matic') {
    return REACT_APP_API_URL_POLYGON as string
  } else if (networkName ===  'goerli') {
    return REACT_APP_API_URL_GOERLI as string
  } else if (networkName ===  'mumbai') {
    return REACT_APP_API_URL_MUMBAI as string
  } else if (networkName ===  'mainnet') {
    return REACT_APP_API_URL_MAINNET as string
  }
  alert(`Application is not working with ${networkName} chain`)
  return `https://ledger-claim-api-${networkName}.linkdrop.io` 
}

export default defineServerUrl