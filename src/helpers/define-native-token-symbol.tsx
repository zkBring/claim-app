type TDefineNativeTokenSymbol = ({ chainId }: { chainId: number | null }) => string
const defineNativeTokenSymbol: TDefineNativeTokenSymbol = ({ chainId }) => {
  switch(chainId) {
    case 100:
      return 'xDAI'
    case 137:
      return 'MATIC'
    case 196:
      return 'OKB'
    default:
      return 'ETH'
  }
}

export default defineNativeTokenSymbol