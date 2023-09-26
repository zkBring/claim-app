import { FC } from 'react'
import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonStyled
} from '../styles/styled-components'
import { shortenString } from 'helpers'
import ErrorImg from 'images/error-black.png'
import { IAppDispatch, RootState } from 'data/store'
import { connect } from 'react-redux'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

const mapStateToProps = ({
  user: {
    address
  }
}: RootState) => ({
  address
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    resetEligibilityCheck: (
      disconnect: any
    ) => dispatch(
        dropAsyncActions.resetEligibilityCheck(
          disconnect
        )
      )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ErrorScreen: FC<ReduxType> = ({
  address,
  resetEligibilityCheck
}) => {
  const { disconnect } = useDisconnect()
  
  return <Container>
    <Image src={ErrorImg} />
    <Title>Sorry {shortenString(address)}<br/>is not eligible to claim</Title>
    <Subtitle>Connect another address<br/>
    to check its eligibility</Subtitle>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ErrorScreen)
