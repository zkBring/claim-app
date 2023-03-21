type TGasLimits = {
  [chainId: number]: string
}

const gasPriceLimits: TGasLimits = {
  137: '2012406786686', // 212406786686
  1: '2012406786686',
  5: '2012406786686',
  80001: '2012406786686'
}

export default gasPriceLimits