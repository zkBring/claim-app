type TGasLimits = {
  [chainId: number]: string
}

const gasPriceLimits: TGasLimits = {
  137: '1', // 212406786686
  1: '212406786686',
  5: '212406786686',
  80001: '212406786686'
}

export default gasPriceLimits