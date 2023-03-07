import { FC, ReactElement, useEffect } from 'react'
import { useAccount, useChainId, useProvider, useConnect } from 'wagmi'
import InitialScreen from './initial-screen'
import ChangeNetwork from './change-network'
import ClaimingFinished from './claiming-finished'
import ClaimingProcess from './claiming-process'
import AlreadyClaimed from './already-claimed'
import SetConnector from './set-connector'
import NoTokensLeft from './no-tokens-left'
import SetAddress from './set-address'
import ErrorPage from './error'
import ErrorTransactionPage from './error-transaction'
import ErrorNoConnectionPage from './error-no-connection'
import WalletsListPage from './wallets-list'
import ErrorServerFail from './error-server-fail'
import ErrorLinkExpired from './error-link-expired'
import ErrorAlreadyClaimed from './error-already-claimed'
import ErrorLinkNotFound from './error-link-not-found'
import ErrorLinkNoConnection from './error-link-no-connection'
import ErrorLink from './error-link-error'
import ChooseWallet from './choose-wallet'
import ShortCodeLoading from './short-code-loading'
import HighGasPrice from './high-gas-price'
import LinkdropLogo from 'images/linkdrop-header.png'
import { Loader } from 'components/common'
import Page from '../page'
import { TDropStep } from 'types'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { Container, LinkdropHeader } from './styled-components'
import { Dispatch } from 'redux'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import { useHistory } from 'react-router-dom'

const mapStateToProps = ({
  user: { address, provider, chainId, initialized },
  drop: { step, claimCode }
}: RootState) => ({
  address,
  step,
  provider,
  chainId,
  initialized,
  claimCode
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
      getData: (
        onReload: () => void,
        address?: string,
        chainId?: number,
        provider?: any
      ) => dispatch(dropAsyncActions.getInitialData(
        onReload,
        address,
        chainId,
        provider
      )),
      updateUserData: (
        address: string,
        chainId: number,
        provider: any
      ) => dispatch(userAsyncActions.updateUserData(
        address,
        chainId,
        provider
      )), 
      setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

type TDefineStep = (step: TDropStep) => ReactElement

const defineCurrentScreen: TDefineStep = step => {
  switch (step) {
    case 'initial':
      return <InitialScreen />
    case 'change_network':
      return <ChangeNetwork />
    case 'claiming_process':
      return <ClaimingProcess />
    case 'claiming_finished':
      return <ClaimingFinished />
    case 'already_claimed':
      return <AlreadyClaimed />
    case 'set_connector':
      return <SetConnector />
    case 'no_tokens_left':
      return <NoTokensLeft />
    case 'error':
      return <ErrorPage />
    case 'set_address':
      return <SetAddress />
    case 'error_transaction':
      return <ErrorTransactionPage />
    case 'error_no_connection':
      return <ErrorNoConnectionPage />
    case 'error_server_fail':
      return <ErrorServerFail />
    case 'link_expired':
      return <ErrorLinkExpired />
    case 'error_already_claimed':
      return <ErrorAlreadyClaimed />
    case 'choose_wallet':
      return <ChooseWallet />
    case 'wallets_list':
      return <WalletsListPage />
    case 'gas_price_high':
      return <HighGasPrice />
    case 'error_link_not_found':
      return <ErrorLinkNotFound />
    case 'error_link_no_connection':
      return <ErrorLinkNoConnection />
    case 'error_link':
      return <ErrorLink />
    case 'short_code_loading':
      return <ShortCodeLoading />
    default:
      return <Loader />
  }
}

const ClaimPage: FC<ReduxType> = ({
  step,
  getData,
  claimCode
}) => {
  const screen = defineCurrentScreen(step)
  const { address } = useAccount()
  const chainId = useChainId()
  const provider = useProvider()
  const history = useHistory()

  useEffect(() => {
    if (!claimCode) { return }
    getData(
      () => { history.push('/') },
      address,
      chainId,
      provider
    )
  }, [address, chainId, provider, claimCode])
  
  return <Page>
    <Container>
      <LinkdropHeader src={LinkdropLogo} alt="Linkdrop" />
      {screen}
    </Container> 
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimPage)
