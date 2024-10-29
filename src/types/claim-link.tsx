export type TClaimLinkERC20 = {
  weiAmount: string,
  tokenAddress: string,
  tokenAmount: string,
  expirationTime: string,
  linkKey: string,
  linkdropMasterAddress: string,
  linkdropSignerSignature: string,
  receiverAddress: string,
  campaignId: string
}

export type TClaimLinkERC721 = {
  weiAmount: string,
  nftAddress: string,
  tokenId: string,
  expirationTime: string,
  linkKey: string,
  linkdropMasterAddress: string,
  linkdropSignerSignature: string,
  receiverAddress: string,
  campaignId: string
}

export type TClaimLinkERC1155 = {
  weiAmount: string,
  nftAddress: string,
  tokenId: string,
  tokenAmount: string,
  expirationTime: string,
  linkKey: string,
  linkdropMasterAddress: string,
  linkdropSignerSignature: string,
  receiverAddress: string,
  campaignId: string
}

export type TClaimResult = {
  success: boolean,
  errors: string[],
  txHash: string,
  message: string,
  alreadyClaimed: boolean
}
