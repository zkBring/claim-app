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
  BringLogo
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { TDropError, TDropType, TMultiscanStep } from 'types'
import BringLogoImage from 'images/bring-fun.png'
import RedirectImg from 'images/redirect-image.png'

import {
  QRNotMapped,
  QRNotFound,
  QRNoConnection,
  QRIncorrectParameter,
  QRCampaignNotStarted,
  QRCampaignFinished,
  QRCampaignNotActive,
  QRNoLinksToShare,
  QRCampaignNotEligible
} from 'components/pages/common'
import Icons from 'icons'
import * as dropActions from 'data/store/reducers/drop/actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { Dispatch } from 'redux'
import WhitelistDispenser from './components/whitelist'
import { Loader, Link } from 'components/common'

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
    whitelistType,
    multiscanLinkDecrypted
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
  error,
  loading,
  multiscanLinkDecrypted,
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
      callback?: (location: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkByMultiQR(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
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

const Scan: FC<ReduxType> = ({
  getLink,
  error,
  multiscanStep,
  getMultiQRCampaignData,
  multiscanLinkDecrypted
}) => {
  const {
    multiscanQRId,
    scanId,
    scanIdSig,
    multiscanQREncCode
  } = useParams<TParams>()

  // '/scan/:multiscanQRId/:scanId/:scanIdSig/:multiscanQREncCode'


  const history = useHistory()

  useEffect(() => {    
    // get campaign data
    getMultiQRCampaignData(
      multiscanQRId,
      multiscanQREncCode,
      // callback if redirect enabled
      (location) => {
        const path = location.split('/#')[1]
        history.push(path)
      }
    )
  }, [])

  useEffect(() => {
    // get link
    if (multiscanStep === 'initial') {
      getLink(
        multiscanQRId,
        scanId,
        scanIdSig,
        multiscanQREncCode,
        (location) => {
          history.push(location)
        }
      )
    }
  }, [multiscanStep])

  if (error) {
    return <ErrorScreen error={error} />
  }

  if (multiscanStep === 'link_received') {
    return <Page>
      <Container>
        <Image src={RedirectImg} />
        <Subtitle>
        You are about to claim tokens with Linkdrop. If you are not automatically redirected, please go <Link href={multiscanLinkDecrypted as string}>here</Link>
        </Subtitle>
      </Container>
    </Page>
  }

  if (
    multiscanStep === 'initial' ||
    multiscanStep === 'not_initialized'
  ) {
    return <Page>
      <Container>
        <BringLogo src={BringLogoImage} />
        <Loader />
      </Container>
    </Page>
  }

  return <WhitelistDispenser />
  
}

export default connect(mapStateToProps, mapDispatcherToProps)(Scan)
