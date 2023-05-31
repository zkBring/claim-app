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
  IconContainer,
  LoadingTitle,
  ButtonStyled
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { TDropError, TMultiscanStep, TWalletName } from 'types'
import {
  QRNotMapped,
  QRNotFound,
  QRNoConnection,
  QRIncorrectParameter,
  QRCampaignNotStarted,
  QRCampaignFinished,
  PageHeader,
  PoweredByFooter,
  QRNoLinksToShare,
  WalletsListPage,
  SetAddress,
  ZerionConnection,
  DownloadAwait
} from 'components/pages/common'
import Icons from 'icons'
import { defineSystem } from 'helpers'
import { useAccount, useConnect } from 'wagmi'
import GiftPreview from 'images/dispenser-preview-image.png'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({
  user: { initialized },
  drop: { error, loading, multiscanStep, wallet },
}: RootState) => ({ initialized, error, loading, multiscanStep, wallet })

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & IAppDispatch) => {
  return {
    setMultiscanStep: (step: TMultiscanStep) => dispatch(dropActions.setMultiscanStep(step)),
    getLink: (
      multiscanQRId: string,
      scanId: string,
      scanIdSig: string,
      multiscanQREncCode: string,
      address: string,
      callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.getLinkByMultiQR(
          multiscanQRId,
          scanId,
          scanIdSig,
          multiscanQREncCode,
          address,
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

  if (error === 'qr_no_links_to_share') {
    return <Page>
      <QRNoLinksToShare />
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

const DefaultScreen: FC<{
  setStep: (step: TMultiscanStep) => void
}> = ({ setStep }) => {
  return <>
    <Image src={GiftPreview} />
    <Title>Claim digital asset</Title>
    <Subtitle>To claim this asset, you will need to have Wallet set up and ready to use</Subtitle>
    <ButtonStyled 
      appearance='action'
      onClick={() => {
        // connect({ connector: injected })
        // setIsInjected(true)
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
  setMultiscanStep: (multiscanStep: TMultiscanStep) => void
) => {
  let content = null
  const header = defineHeader(
    multiscanStep,
    wallet,
    () => setMultiscanStep('initial'))
  switch (multiscanStep) {
    case 'initial':
      content = <DefaultScreen setStep={setMultiscanStep} />
      break
    case 'set_address':
      content = <SetAddress />
      break
    case 'wallets_list':
      content = <WalletsListPage setStep={setMultiscanStep}/>
      break
    case 'download_await':
      content = <DownloadAwait />
      break
    case 'zerion_connection':
      content = <ZerionConnection />
      break
    case 'wallet_redirect_await':
      content = null
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
  wallet
}) => {
  const { multiscanQRId, scanId, scanIdSig, multiscanQREncCode } = useParams<TParams>()
  const history = useHistory()
  const { address, isConnected } = useAccount()
  const [ isInjected, setIsInjected ] = useState<boolean>(false)
  const [ initialized, setInitialized ] = useState<boolean>(false)
  const system = defineSystem()

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
    if (!initialized || !address) {
      return
    }
    if (isInjected || isConnected) {
      setMultiscanStep('initial')
      getLink(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
        address,
        (location) => {
          const path = location.split('/#')[1]
          history.push(path)
        }
      )
    }
  }, [initialized, address])


  if (loading || !initialized) {
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

  // if we are not on web3

  return renderContent(
    multiscanStep,
    wallet,
    setMultiscanStep
  )
  
}

export default connect(mapStateToProps, mapDispatcherToProps)(Scan)
