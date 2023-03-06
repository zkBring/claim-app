import { FC, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { IAppDispatch, RootState } from 'data/store'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { connect } from 'react-redux'
import {
  Container,
  IconContainer,
  LoadingText,
  LoadingTitle
} from './styled-components'
import Page from '../page'
import Icons from 'icons'
import {
  LinkNotFound,
  LinkNoConnection,
  LinkError
} from 'components/pages/common'

const mapStateToProps = ({
  drop: { error }
}: RootState) => ({ error })

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    getLink: (
      code: string,
      callback: (claimCode: string) => void
    ) => dispatch(
      dropAsyncActions.getLinkFromURL(
        code,
        callback
      )
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ShortLinkPage: FC<ReduxType> = ({
  getLink,
  error
}) => {
  const history = useHistory()
  const params = useParams<{claimCode: string}>()
  useEffect(() => {
    getLink(params.claimCode, (linkCode) => history.push(`/receive`))    
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

  if (error === 'link_not_found') {
    return <Page>
      <LinkNotFound />
    </Page>
  }

  if (error === 'link_no_connection') {
    return <Page>
      <LinkNoConnection />
    </Page>
  }

  if (error === 'link_error') {
    return <Page>
      <LinkError />
    </Page>
  }
  
  return null
}

export default connect(mapStateToProps, mapDispatcherToProps)(ShortLinkPage)