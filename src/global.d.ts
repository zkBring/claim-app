
declare module '@linkdrop/sdk' {
  type ISDK = import('./types').ISDK
  type TClaimResult = import('./types').TClaimResult
  type TClaimLinkERC20 = import('./types').TClaimLinkERC20
  type TClaimLinkERC721 = import('./types').TClaimLinkERC721
  type TClaimLinkERC1155 = import('./types').TClaimLinkERC1155

  class LinkdropSDK implements ISDK {
    constructor(params: ISDK)
    getProxyAddress: (campaignId: string) => string

    claimERC20: ({
      weiAmount,
      tokenAddress,
      tokenAmount,
      expirationTime,
      linkKey,
      linkdropMasterAddress,
      linkdropSignerSignature,
      receiverAddress,
      campaignId
    }: TClaimLinkERC20) => TClaimResult

    claimERC721: ({
      weiAmount,
      nftAddress,
      tokenId,
      expirationTime,
      linkKey,
      linkdropMasterAddress,
      linkdropSignerSignature,
      receiverAddress,
      campaignId
    }: TClaimLinkERC721) => TClaimResult

    claimERC1155: ({
      weiAmount,
      nftAddress,
      tokenId,
      tokenAmount,
      expirationTime,
      linkKey,
      linkdropMasterAddress,
      linkdropSignerSignature,
      receiverAddress,
      campaignId
    }: TClaimLinkERC1155) => TClaimResult
  }
  export = LinkdropSDK
}


declare module '@walletconnect/utils/dist/esm' {
  type TDecrypt = ({ encoded, symKey } : { encoded: string, symKey: string }) => string
  const methods: { decrypt: TDecrypt } = {
    decrypt: ({ encoded, symKey }) => {}
  }
  export = methods
}

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