const ipfsGatewayUrl = 'https://cloudflare-ipfs.com/ipfs'

const redefineURL = (url: string) => {
  if (url.startsWith('ipfs://')) {
    return `${ipfsGatewayUrl}/${url.replaceAll('ipfs://', '').replaceAll('ipfs/', '')}`
  } else {
    return url
  }
}

export default redefineURL