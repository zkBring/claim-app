import { FC, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  AdditionalTextComponent,
  Hr
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import LedgerLogo from 'images/ledger.png'
import { alertError, defineSystem, getHashVariables } from 'helpers'
import { Dispatch } from 'redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { UserActions } from 'data/store/reducers/user/types'
import { ScreenLoader } from '..'
import { TDropType } from 'types'
import TProps from './types'
import { loadConnectKit, SupportedProviders } from '@ledgerhq/connect-kit-loader'
import { ethers } from 'ethers'
const { REACT_APP_WC_PROJECT_ID } = process.env

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<UserActions> & IAppDispatch) => {
  return {
    updateUserData: (
      address: string,
      chainId: number,
      signer: any,
      callback?: () => void
    ) => dispatch(userAsyncActions.updateUserData(
      address,
      chainId,
      undefined,
      signer,
      callback
    ))
  }
}

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, chainId }
}: RootState) => ({
  name, image, type, tokenId, chainId
})

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineButton = (
  setLoading: (loading: boolean) => void, 
  updateUserData: (
    address: string,
    chainId: number,
    signer: any,
    callback?: (address?: string) => void
  ) => void,
  callback?: (address?: string) => void
) => {
  return <ScreenButton
    appearance='action'
    onClick={async () => {
      setLoading(true)
      try {
        const connectKit = await loadConnectKit()
        connectKit.enableDebugLogs();
        connectKit.checkSupport({
          providerType: SupportedProviders.Ethereum,
          walletConnectVersion: 2,
          projectId: REACT_APP_WC_PROJECT_ID,
          chains: [1, 137],
        })
  
        const provider = await connectKit.getProvider()
        const accounts: string[] = await provider.request({ method: 'eth_requestAccounts' })
        if (accounts) {
          const library = new ethers.providers.Web3Provider(provider)
          const signer = library.getSigner()
          const network = await library.getNetwork()
          updateUserData(
            accounts[0],
            network.chainId,
            signer,
            callback
          )
        } else {
          alertError('No account found')
        }
      } catch (err) {
        alertError('Some error occured. Please check console for more info')
      }
      setLoading(true)
    }
  }>
    Use LedgerLive
  </ScreenButton>
}

const renderTexts = (
  type: TDropType
) => {
  return <>
    <WalletIcon src={LedgerLogo} /> 
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Claim {type === 'ERC20' ? 'tokens' : 'NFT'} using your LedgerLive.
    </TextComponent>
  </>
}

const LedgerConnection: FC<ReduxType & TProps> = ({
  updateUserData,
  type,
  setStepCallback
}) => {
  const [ loading, setLoading ] = useState<boolean>(false)
  const handleUpdateUser = (
    address: string,
    chainId: number,
    signer: any,
    callback?: (address?: string) => void
  ) => {
    updateUserData(
      address,
      chainId,
      signer,
      callback
    )
  }


  if (loading) {  
    return <ScreenLoader onClose={() => {
      setLoading(false)
    }}/>
  }
  return <Container> 
    {renderTexts(type as TDropType)}
    {defineButton(
      setLoading,
      handleUpdateUser,
      setStepCallback
    )}
    <Hr />
    <AdditionalTextComponent>Once you approve the connection with your wallet, return to this page to claim {type === 'ERC20' ? 'tokens' : 'the NFT'}.</AdditionalTextComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(LedgerConnection)