type TGasLimits = {
  [chainId: number]: string
}

const gasPriceLimits: TGasLimits = {
  137: '1', // 212406786686
  1: '1',
  5: '1',
  80001: '1'
}

export default gasPriceLimits