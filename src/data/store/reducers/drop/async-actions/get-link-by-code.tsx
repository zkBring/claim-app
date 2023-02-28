
import { Dispatch } from 'redux';
import { DropActions } from '../types'
import { ethers } from 'ethers'
import * as wccrypto from '@walletconnect/utils/dist/esm'
import { getOriginalLink } from 'data/api'
import { constructLink } from 'helpers'
import * as actionsDrop from '../actions'
import axios, { AxiosError } from 'axios'

export default function getLinkByCode(
  code: string
) {
  return async (
    dispatch: Dispatch<DropActions>
  ) => {
    dispatch(actionsDrop.setLoading(true))
    try {
      throw new Error()
      return '/receive?weiAmount=0&nftAddress=0x10ae0a185dd6eaef2a3692c42ae52d4e8b1c4e6d&tokenId=2409411013552593313002637703952938629808311709759033038162736472482696396802&tokenAmount=1&expirationTime=1900000000000&version=2&chainId=137&linkKey=0x8c07f35fac3290a8d502219968e25f5c2fc4a08d5b98c66112994e2500faa63f&linkdropMasterAddress=0x0553aDA5829184A7818dC866367D77334183603E&linkdropSignerSignature=0x8f40df5e130b54dbc1e0926207188a2bd5be268adc68c9a284a533de12c0c8e148ec27dbdb0a27ba616039900438058353860c7b6e412e34129cc4d4b7a5722f1c&campaignId=1&w=metamask'
    } catch (err: any | AxiosError) {
      dispatch(actionsDrop.setLoading(false))
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          return { message: 'Code not found' }
        } else {
          return { message: 'Some error occured' }
        }
      } else {
        return { message: 'Some error occured' }
      }      
    }
  } 
}
