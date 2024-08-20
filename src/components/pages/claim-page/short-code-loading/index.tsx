import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import { Container } from './styled-components'
import { Loader } from 'components/common'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep } from 'types'
import { useQueryParams } from 'hooks'

const mapStateToProps = ({
  drop: { error }
}: RootState) => ({ error })

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & IAppDispatch) => {
  return {
    getLink: (
      code: string,
      linkAddress: string | null,
      autoclaim: boolean | null,
      callback: (claimCode: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkFromURL(
        code,
        linkAddress,
        autoclaim,
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
  const queryParams = useQueryParams()
  useEffect(() => {
    getLink(
      params.claimCode,
      queryParams.get('dest'),
      Boolean(queryParams.get('autoclaim')),
      (linkCode) => setStep('loading')
    )    
  }, [])
  
  return <Container>
    <Loader size="large" />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ShortLinkPage)