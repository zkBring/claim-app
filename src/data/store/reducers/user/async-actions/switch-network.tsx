import { IMetamaskError } from 'types'
import {
  toHex,
} from 'helpers'
import chains from 'configs/chains'

async function switchNetwork (
	provider: any,
  chainId: number,
  callback: () => void
) {
  console.log({ chainId: toHex(chainId) })
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: toHex(chainId) }],
    })

    callback && callback()
    
  } catch (err) {
      console.log({ err })
      const switchError = err as IMetamaskError
      console.log(switchError.code)
      if (switchError.code && switchError.code === 4902) {
        try {
          const chainObj = chains[chainId]
          if (chainObj) {
            const data = {
              chainName: chainObj.chainName,
              nativeCurrency: chainObj.nativeCurrency,
              rpcUrls: chainObj.rpcUrls,
              blockExplorerUrls: chainObj.blockExplorerUrls,
              chainId: toHex(chainId)
            }

            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [data],
            })

            callback && callback()
          }
        } catch (addError) {
          console.error({
            addError
          })
        }
      }    
  }
}

export default switchNetwork