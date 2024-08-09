export type TProps = {
  chainId?:  number | null
  switchNetwork?: (
    chainId: number,
    callback: () => void
  ) => void
  switchNetworkCallback?: () => void
  className?: string
  enableChainName?: boolean
}