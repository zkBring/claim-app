import { FC, useEffect } from 'react'
import ErrorImageBlack from 'images/error-black.png'
import ErrorImageWhite from 'images/error-white.png'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  Image,
  Title,
  Subtitle,
  IconContainer,
  LoadingText,
  LoadingTitle
} from './styled-components'
import { Loader } from 'components/common'
import { useParams, useHistory } from 'react-router-dom'
import Page from '../page'
import { getHashVariables } from 'helpers'
import { QRNotMapped, QRNotFound, QRNoConnection, QRIncorrectParameter } from 'components/pages/common'
import Icons from 'icons'

const mapStateToProps = ({
  user: { initialized },
  drop: { error }
}: RootState) => ({ initialized, error })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getLink: (
        qrId: string, callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.getLink(
          qrId, callback 
        )
      )
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps> & ReturnType<typeof mapStateToProps>

const QR: FC<ReduxType> = ({ getLink, initialized, error }) => {
  const { qrId } = useParams<{ qrId: string }>()
  const { theme } = getHashVariables(window.location.href)
  const errorImage = theme === 'light' ? ErrorImageBlack : ErrorImageWhite
  const history = useHistory()

  useEffect(() => {
    if (!qrId) { return }
    getLink(qrId, (location) => {
      const path = location.split('/#')[1]
      history.push(path)
    })
  }, [])

  if (!error) {
    return <Page>
      <Container>
        <IconContainer>
          <Icons.LinkdropIcon />
        </IconContainer>
        <LoadingTitle>Linkdrop</LoadingTitle>
        <LoadingText>Safe NFT claims since 2019</LoadingText>
      </Container>
    </Page>
  }

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

  return <Page>
    <Container>
      <Image src={errorImage} />
      <Title>Something went wrong</Title>
      <Subtitle>Please, try again later</Subtitle>
      {/* <ButtonStyled onClick={() => {}}>Retry</ButtonStyled> */}
    </Container>
  </Page>
}

export default connect(mapStateToProps, mapDispatcherToProps)(QR)
