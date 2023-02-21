import { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    retrieveOriginalLink: (
        linkKey: string, callback: (location: string) => void
      ) => dispatch(
        dropAsyncActions.retrieveOriginalLink(
          linkKey, callback 
        )
      )
  }
}

type ReduxType = ReturnType<typeof mapDispatcherToProps>

const ShortLinkPage: FC<ReduxType> = ({
  retrieveOriginalLink
}) => {
  const history = useHistory()
  const params = useParams<{linkKey: string}>()
  useEffect(() => {
    console.log({ params })
    retrieveOriginalLink(params.linkKey, (location) => history.push(location))    
  }, [])
  return null
}

export default connect(null, mapDispatcherToProps)(ShortLinkPage)