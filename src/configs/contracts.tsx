type TContracts = {
  [networkId: string | number]: {
    factory: string;
  }
}

const contracts: TContracts = {
  1: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // mainnet
  5: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // goerli
  137: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  }, // polygon
  80001: {
    factory: '0x50dADaF6739754fafE0874B906F60688dB483855'
  },
  8453: {
    factory: '0xa81880C06e925Ad1412773D621425796467A9C61'
  },
  84531: {
    factory: '0xa81880C06e925Ad1412773D621425796467A9C61'
  }

}

export default contracts