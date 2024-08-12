type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  1: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // mainnet
  137: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // polygon
  8453: {
    factory: '0xa81880C06e925Ad1412773D621425796467A9C61'
  },
  13371: {
    factory: '0xb619944Cb20133E4C9A67608845d891A2508c59F'
  }

}

export default contracts