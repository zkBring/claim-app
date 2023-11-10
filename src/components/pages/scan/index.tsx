import { FC, useEffect, useState, useCallback } from 'react'
import ErrorImageBlack from 'images/error-black.png'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  Image,
  Title,
  Subtitle,
  IconContainer,
  LoadingTitle,
  ButtonStyled,
  TokenImageContainer
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { TDropError, TDropType, TMultiscanStep, TWhitelistType } from 'types'
import {
  QRNotMapped,
  QRNotFound,
  QRNoConnection,
  QRIncorrectParameter,
  QRCampaignNotStarted,
  QRCampaignFinished,
  QRCampaignNotActive,
  PageHeader,
  PoweredByFooter,
  QRNoLinksToShare,
  WalletsListPage,
  SetAddress,
  ZerionConnection,
  DownloadAwait,
  ERC20TokenPreview,
  WalletRedirectAwait,
  CrossmintConnection,
  SignMessage,
  EligibleToClaim,
  QRCampaignNotEligible
} from 'components/pages/common'
import Icons from 'icons'
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
    getLink: (
      multiscanQRId: string,
      scanId: string,
      scanIdSig: string,
      multiscanQREncCode: string,
      address: string,
      signer?: any,
      callback?: (location: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkByMultiQR(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
        address,
        signer,
        callback 
      )
    ),
    getMultiQRCampaignData: (
      multiscanQRId: string,
      multiscanQREncCode: string,
      callback?: (location: string) => void
    ) => {
      dispatch(dropAsyncActions.getMultiQRCampaignData(
        multiscanQRId,
        multiscanQREncCode,
        callback
      ))
    }
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
  wallet: string | null,
  action: (step: TMultiscanStep) => void
) => {
  switch (multiscanStep) {
    case 'download_await':
    case 'zerion_connection':
    case 'crossmint_connection':
      return () => action('wallets_list')
    case 'wallet_redirect_await':
      // if coinbase - do not show other wallets
      if (wallet === 'coinbase_wallet') {
        return () => action('initial')
      }
      return () => action('wallets_list')
    case 'wallets_list':
      return () => action('initial')

    default:
      return null
  }
}

const defineHeader = (
  multiscanStep: TMultiscanStep,
  wallet: string | null,
  action: (step: TMultiscanStep
) => void) => {
  const backAction = defineBackAction(multiscanStep, wallet, action)
  return <PageHeader backAction={backAction}/>
}

const renderContent = (
  multiscanStep: TMultiscanStep,
  wallet: string | null,
  setMultiscanStep: (multiscanStep: TMultiscanStep) => void,
  image: string | null,
  name: string | null,
  type: TDropType | null,
  amount: string | null,
  decimals: number,
  whitelistOn: boolean,
  whitelistType: TWhitelistType | null,
  setAddressCallback: (address?: string) => void
) => {
  let content = null
  const header = defineHeader(
    multiscanStep,
    wallet,
    () => setMultiscanStep('initial'))
  switch (multiscanStep) {
    case 'initial':
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
    case 'zerion_connection':
      content = <ZerionConnection
        setStepCallback={() => {
          if (whitelistOn && whitelistType) {
            setMultiscanStep('sign_message')
          } else {
            setMultiscanStep('initial')
            setAddressCallback()
          }
        }}
      />
      break
    case 'crossmint_connection':
      content = <CrossmintConnection />
      break
    case 'wallet_redirect_await':
      content = <WalletRedirectAwait />
      break
    case 'sign_message':
      content = <SignMessage
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
  getLink,
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
  getMultiQRCampaignData
}) => {
  const { multiscanQRId, scanId, scanIdSig, multiscanQREncCode } = useParams<TParams>()
  const history = useHistory()
  const { address, isConnected } = useAccount()
  const [ isInjected, setIsInjected ] = useState<boolean>(false)
  const [ initialized, setInitialized ] = useState<boolean>(false)
  const system = defineSystem()
  const signer = useEthersSigner()

  const getLinkCallback = useCallback((addressArg?: string) => {
    getLink(
      multiscanQRId,
      scanId,
      scanIdSig,
      multiscanQREncCode,
      addressArg || address as string || userAddress,
      signer,
      (location) => {
        if (whitelistOn) {
          setMultiscanStep('eligible_to_claim')
        } else {
          const path = location.split('/#')[1]
          history.push(path)
        }
      }
    )
  }, [userAddress])

  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === 'injected')

  useEffect(() => {
    const init = async () => {
      if(window &&
        window.ethereum &&

        // if not commented - would connect injected only for coinbase
        // window.ethereum.isCoinbaseWallet &&
        // if not commented - would connect injected only for coinbase
        system !== 'desktop' &&
        injected &&
        injected.ready
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
    getMultiQRCampaignData(
      multiscanQRId,
      multiscanQREncCode,
      (location) => {
        const path = location.split('/#')[1]
        history.push(path)
      }
    )
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
      if (whitelistOn && whitelistType) {
        setMultiscanStep('sign_message')
      } else {
        setMultiscanStep('initial')
        getLinkCallback(address)
      }
    }
  }, [initialized, address, isConnected, whitelistOn, multiscanStep])


  if (!initialized) {
    return <Page>
      <Container>
        <IconContainer>
          <Icons.LinkdropIcon />
        </IconContainer>
        <LoadingTitle>Linkdrop</LoadingTitle>
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
    getLinkCallback
  )
}

export default connect(mapStateToProps, mapDispatcherToProps)(Scan)
