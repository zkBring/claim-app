import { Dispatch } from 'redux'
import { defineRealNetworkName } from 'helpers'
import { UserActions } from '../types'
import { DropActions } from '../../drop/types'
import { RootState } from 'data/store'
import { getCrossmintAddress } from 'data/api'
import * as actions from '../actions'
import * as actionsDrop from '../../drop/actions'

const getCrossmintAddressAction = (
  jwt: string
) => {
  return async (
    dispatch: Dispatch<UserActions> & Dispatch<DropActions>,
    getState: () => RootState
  ) => {
    const {
      drop: {
        chainId
      }
    } = getState()

    dispatch(actions.setLoading(true))
    
    try {
      const { data: { success, user_address, email } }: { data: { success: boolean, user_address: string, email: string } } = await getCrossmintAddress(
        chainId as number,
        jwt
      )

      if (success) {
        dispatch(actions.setEmail(email))
        dispatch(actions.setAddress(user_address))
        dispatch(actions.setChainId(chainId as number))
        dispatch(actionsDrop.setStep('initial'))
      } else {
        alert('Error occured with crossmint address fetch. Please try again')
      }
      
    } catch (err) {
      alert('Error occured with crossmint address fetch. Please try again')
    }
    dispatch(actions.setLoading(false))
  }
}

export default getCrossmintAddressAction