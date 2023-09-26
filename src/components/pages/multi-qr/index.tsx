import { FC, useEffect } from 'react'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  IconContainer,
  LoadingTitle
} from './styled-components'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { QRIncorrectParameter } from 'components/pages/common'
import Icons from 'icons'
import { alertError } from 'helpers'

const mapStateToProps = ({
  user: { initialized },
  drop: { error }
}: RootState) => ({ initialized, error })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    computeScanAddress: (
      qrSecret: string,
      qrEncCode: string,
        callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.computeScanAddress(
          qrSecret,
          qrEncCode,
          callback 
        )
      )
  }
}

type TParams = { qrSecret: string, qrEncCode: string }
type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const MultiQR: FC<ReduxType> = ({ computeScanAddress, initialized, error }) => {
  const { qrSecret, qrEncCode } = useParams<TParams>()
  const history = useHistory()

  useEffect(() => {
    if (!qrEncCode) { alertError('QR_ENC_CODE is not found in URL') }
    if (!qrSecret) { alertError('QR_SECRET is not found in URL') }
    computeScanAddress(
      qrSecret,
      qrEncCode,
      (location) => {
        history.push(location)
      }
    )
  }, [qrSecret])

  if (error === 'qr_incorrect_parameter') {
    return <Page>
      <QRIncorrectParameter />
    </Page>
  }

  return <Page>
    <Container>
      <IconContainer>
        <Icons.LinkdropIcon />
      </IconContainer>
      <LoadingTitle>Linkdrop</LoadingTitle>
    </Container>
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(MultiQR)
