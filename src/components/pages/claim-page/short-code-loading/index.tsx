import { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  IconContainer,
  LoadingTitle
} from './styled-components'
import Icons from 'icons'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep, TSystem } from 'types'
import { defineSystem } from 'helpers'

const mapStateToProps = ({
  drop: { error }
}: RootState) => ({ error })

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & IAppDispatch) => {
  return {
    getLink: (
      code: string,
      system: TSystem,
      callback: (claimCode: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkFromURL(
        code,
        system,
        callback
      )
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ShortLinkPage: FC<ReduxType> = ({
  getLink,
  setStep
}) => {
  const params = useParams<{claimCode: string}>()
  const system = defineSystem()
  useEffect(() => {
    getLink(
      params.claimCode,
      system,
      (linkCode) => setStep('loading')
    )    
  }, [])
  
  return <Container>
    <IconContainer>
      <Icons.LinkdropIcon />
    </IconContainer>
    <LoadingTitle>Linkdrop</LoadingTitle>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ShortLinkPage)