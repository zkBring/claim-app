import { ethers } from 'ethers'

const resolveENS = async (
  ens: string,
  provider: ethers.providers.JsonRpcProvider
) => {
  if (ens.length === 42 && ens.startsWith('0x')) {
    return ens
  }

  try {
    const resolve = await provider.resolveName(ens)
    if (resolve === null) {
      return false
    }
    return resolve
  } catch (e: any) {
    if (e.code === "NETWORK_ERROR") {
      return null
    }
    return false
  }
}

export default resolveENS
