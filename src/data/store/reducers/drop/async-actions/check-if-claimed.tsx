import { ethers } from 'ethers'
import LinkdropFactory from 'abi/linkdrop-factory.json'
import contracts from 'configs/contracts'

export default async function checkIfClaimed(
  provider: any,
  chainId: number,
  linkId: string,
  linkdropMasterAddress: string,
  campaignId: string
) {
  try {
    const factoryItem = contracts[chainId]
    const factoryContract = await new ethers.Contract(factoryItem.factory, LinkdropFactory.abi, provider)
    return await factoryContract.isClaimedLink(linkdropMasterAddress, campaignId, linkId)
  } catch (err) {
    // @ts-ignore
    // alert(Object.values(err).join(', '))
    return false
  }
}
