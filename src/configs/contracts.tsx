type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  1: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // mainnet
  5: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // goerli
  137: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }, // polygon
  80001: {
    factory: '0xadEA4080b6B3cA8CaB081ce839B3693DbBA8d480'
  }

}

export default contracts