import { ethers } from 'ethers'
import LinkdropFactory from 'abi/linkdrop-factory.json'

export default async function checkIfClaimed(
  provider: any,
  linkId: string | null,
  linkdropMasterAddress: string | null,
  campaignId: string | null,
  factoryAddress: string | null
) {
  try {
    if (!factoryAddress) {
      throw new Error('Factory address is not valid')
    }
    const factoryContract = new ethers.Contract(factoryAddress, LinkdropFactory.abi, provider)
    return await factoryContract.isClaimedLink(linkdropMasterAddress, campaignId, linkId)
  } catch (err) {
    // @ts-ignore
    // alert(Object.values(err).join(', '))
    return false
  }
}
