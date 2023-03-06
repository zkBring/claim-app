type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  1: {
    factory: '0x926923238FE6f4866E7FB29a05538e7C4C118a53'
  }, // mainnet
  5: {
    factory: '0xD61C4f3834480fECaA2EdcF0006FfB3005daE300'
  }, // goerli
  137: {
    factory: '0x18165C54C28cF298059d55CA535529a4958852af'
  }, // polygon
  80001: {
    factory: '0x926923238FE6f4866E7FB29a05538e7C4C118a53'
  }

}

export default contracts