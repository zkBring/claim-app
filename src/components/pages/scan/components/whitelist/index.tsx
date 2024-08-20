import { FC, useEffect, useState } from 'react'
import ErrorImageBlack from 'images/error-black.png'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonStyled,
  TokenImageContainer
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from 'components/pages/page'
import { Loader } from 'components/common'
import {
  TDropError,
  TDropType,
  TMultiscanStep,
  TWalletName,
  TWhitelistType
} from 'types'
import {
  QRNotMapped,
  QRNotFound,
  QRNoConnection,
  LedgerConnection,
  QRIncorrectParameter,
  QRCampaignNotStarted,
  QRCampaignFinished,
  QRCampaignNotActive,
  PageHeader,
  PoweredByFooter,
  QRNoLinksToShare,
  WalletsListPage,
  SetAddress,
  DownloadAwait,
  ERC20TokenPreview,
  WalletRedirectAwait,
  SignMessage,
  EligibleToClaim,
  QRCampaignNotEligible
} from 'components/pages/common'
import { defineSystem } from 'helpers'
import { useAccount, useConnect } from 'wagmi'
import GiftPreview from 'images/dispenser-preview-image.png'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { Dispatch } from 'redux'
import { useEthersSigner } from 'hooks'

const mapStateToProps = ({
  user: { initialized, address },
  drop: {
    error,
    loading,
    multiscanStep,
    wallet,
    type,
    amount,
    whitelistOn,
    whitelistType
  },
  token: {
    image,
    name,
    decimals
  }
}: RootState) => ({
  userAddress: address,
  type,
  amount,
  decimals,
  initialized,
  error, loading,
  multiscanStep,
  wallet,
  image,
  name,
  whitelistOn,
  whitelistType
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & IAppDispatch) => {
  return {
    setMultiscanStep: (step: TMultiscanStep) => dispatch(dropActions.setMultiscanStep(step)),
    getLinkByAddress: (
      multiscanQRId: string,
      scanId: string,
      scanIdSig: string,
      multiscanQREncCode: string,
      address: string,
      chainId?: number,
      signer?: any,
      callback?: (location: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkByMultiQRWhitelistAddress(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
        address,
        chainId,
        signer,
        callback 
      )
    )
  }
}
type TParams = { multiscanQRId: string, scanId: string, scanIdSig: string, multiscanQREncCode: string }
type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const ErrorScreen: FC<{ error: TDropError | null }> = ({ error }) => {
  if (error === 'qr_not_mapped') {
    return <Page>
      <QRNotMapped />
    </Page>
  }

  if (error === 'qr_not_found') {
    return <Page>
      <QRNotFound />
    </Page>
  }

  if (error === 'qr_no_connection') {
    return <Page>
      <QRNoConnection />
    </Page>
  }

  if (error === 'qr_incorrect_parameter') {
    return <Page>
      <QRIncorrectParameter />
    </Page>
  }

  if (error === 'qr_campaign_not_started') {
    return <Page>
      <QRCampaignNotStarted />
    </Page>
  }

  if (error === 'qr_campaign_finished') {
    return <Page>
      <QRCampaignFinished />
    </Page>
  }

  if (error === 'qr_campaign_not_eligible') {
    return <Page>
      <QRCampaignNotEligible />
    </Page>
  }

  if (error === 'qr_no_links_to_share') {
    return <Page>
      <QRNoLinksToShare />
    </Page>
  }

  if (error === 'qr_campaign_not_active') {
    return <Page>
      <QRCampaignNotActive />
    </Page>
  }

  return <Page>
    <Container>
      <Image src={ErrorImageBlack} />
      <Title>Something went wrong</Title>
      <Subtitle>Please, try again later</Subtitle>
    </Container>
  </Page>
}


const renderTokenPreview = (
  image: string | null,
  name: string | null,
  type: TDropType | null,
  amount: string | null,
  decimals: number
) => {
  if (image && name) {
    if (type === 'ERC20') {
      return <ERC20TokenPreview
        name={name as string}
        image={image as string}
        amount={amount as string}
        decimals={decimals}
        status='initial'
      />
    } else {
      return <>
        <TokenImageContainer src={image} alt={name || 'Token image'} />
        <Title>{name}</Title>
      </>
    }
  } else {
      return <>
        <Image src={GiftPreview} />
        <Title>Claim digital asset</Title>
      </>
  }
}

const DefaultScreen: FC<{
  setStep: (step: TMultiscanStep) => void,
  image: string | null,
  name: string | null,
  type: TDropType | null,
  amount: string | null,
  decimals: number
}> = ({
  setStep,
  name,
  image,
  type,
  amount,
  decimals
}) => {
  return <>
    {renderTokenPreview(
      image,
      name,
      type,
      amount,
      decimals
    )}
    <Subtitle>To claim this asset, you will need to have Wallet set up and ready to use</Subtitle>
    <ButtonStyled 
      appearance='action'
      onClick={() => {
        setStep('wallets_list')
      }}
    >
      Choose Wallet
    </ButtonStyled>
    <PoweredByFooter />
  </>
}

const defineBackAction = (
  multiscanStep: TMultiscanStep,
  wallet: TWalletName | null,
  action: (step: TMultiscanStep) => void
) => {
  switch (multiscanStep) {
    case 'download_await':
    case 'wallet_redirect_await':
      // if coinbase - do not show other wallets
      if (wallet === 'coinbase_wallet') {
        return () => action('whitelist')
      }
      return () => action('wallets_list')
    case 'wallets_list':
      return () => action('whitelist')

    default:
      return null
  }
}

const defineHeader = (
  multiscanStep: TMultiscanStep,
  wallet: TWalletName | null,
  action: (step: TMultiscanStep
) => void) => {
  const backAction = defineBackAction(multiscanStep, wallet, action)
  return <PageHeader backAction={backAction}/>
}

const renderContent = (
  multiscanStep: TMultiscanStep,
  wallet: TWalletName | null,
  setMultiscanStep: (multiscanStep: TMultiscanStep) => void,
  image: string | null,
  name: string | null,
  type: TDropType | null,
  amount: string | null,
  decimals: number,
  whitelistOn: boolean,
  whitelistType: TWhitelistType | null,
  loading: boolean,
  setAddressCallback: (address?: string) => void
) => {
  let content = null
  const header = defineHeader(
    multiscanStep,
    wallet,
    () => setMultiscanStep('whitelist'))
  switch (multiscanStep) {
    case 'whitelist':
      content = <DefaultScreen
        image={image}
        type={type}
        name={name}
        amount={amount}
        decimals={decimals}
        setStep={setMultiscanStep}
      />
      break
    case 'set_address':
      content = <SetAddress
        onSubmit={setAddressCallback}
      />
      break
    case 'wallets_list':
      content = <WalletsListPage
        setStep={setMultiscanStep}
      />
      break
    case 'download_await':
      content = <DownloadAwait />
      break
    case 'ledger_connection':
      content = <LedgerConnection
        setStepCallback={() => setMultiscanStep('whitelist')}
      />
      break
    case 'wallet_redirect_await':
      content = <WalletRedirectAwait />
      break
    case 'sign_message':
      content = <SignMessage
        loading={loading}
        onSubmit={() => setAddressCallback()}
      />
      break
    case 'eligible_to_claim':
      content = <EligibleToClaim
        onSubmit={setAddressCallback}
      />
      break
    default:
      content = null
      break
  }

  return <Page>
    <Container>
      {header}
      {content}
    </Container>
  </Page>
}

const Scan: FC<ReduxType> = ({
  getLinkByAddress,
  error,
  loading,
  multiscanStep,
  setMultiscanStep,
  wallet,
  image,
  name,
  type,
  amount,
  decimals,
  whitelistOn,
  whitelistType,
  userAddress,
}) => {
  const { multiscanQRId, scanId, scanIdSig, multiscanQREncCode } = useParams<TParams>()
  const history = useHistory()
  const { address, isConnected, chainId } = useAccount()
  const [ isInjected, setIsInjected ] = useState<boolean>(false)
  const [ initialized, setInitialized ] = useState<boolean>(false)
  const system = defineSystem()
  const signer = useEthersSigner()

  const getLinkCallback = (addressArg?: string) => {
    getLinkByAddress(
      multiscanQRId,
      scanId,
      scanIdSig,
      multiscanQREncCode,
      addressArg || address as string,
      chainId,
      signer,
      (location) => {
        setMultiscanStep('eligible_to_claim')
      }
    )
  }

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === 'injected')

  useEffect(() => {
    const init = async () => {
      if(window &&

        //@ts-ignore
        window.ethereum &&

        // if not commented - would connect injected only for coinbase
        // window.ethereum.isCoinbaseWallet &&
        // if not commented - would connect injected only for coinbase
        system !== 'desktop' &&
        injected
      ) {
        connect({ connector: injected })
        setIsInjected(true)
      } else {
        setIsInjected(false)
      }
      setInitialized(true)
    }
    init()
  }, [])

  useEffect(() => {
    if (
      !initialized ||
      !address ||
      multiscanStep === 'not_initialized' ||
      multiscanStep === 'eligible_to_claim'
    ) {
      return
    }
    if (isInjected || isConnected) {
      setMultiscanStep('sign_message')
    }
  }, [initialized, address, isConnected, whitelistOn, multiscanStep])


  if (!initialized) {
    return <Page>
      <Container>
        <Loader size="large" />
      </Container>
    </Page>
  }

  if (error) {
    return <ErrorScreen error={error} />
  }

  return renderContent(
    multiscanStep,
    wallet,
    setMultiscanStep,
    image,
    name,
    type,
    amount,
    decimals,
    whitelistOn,
    whitelistType,
    loading,
    getLinkCallback
  )
}

export default connect(mapStateToProps, mapDispatcherToProps)(Scan)
