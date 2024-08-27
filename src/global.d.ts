declare module '@linkdrop/contracts/scripts/utils.js' {
  type Module = {
    signReceiverAddress: (linkKey: string, address: string) => string
  }
  const methods: Module
  export = methods
}

declare module 'is-ios' {
  type Module = boolean
  const library: Module
  export = library
}

declare module 'is-android' {
  type Module = boolean
  const library: Module
  export = library
}