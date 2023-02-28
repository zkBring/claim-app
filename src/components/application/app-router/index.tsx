import { FC, useEffect, useState } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import {
  NotFound,
  ClaimPage,
  Page,
  QR,
  HomePage,
  ShortLinkPage
} from 'components/pages'
import { Container } from './styled-components'
import { Loader } from 'components/common'

const AppRouter: FC = () => {
  const { connector } = useWeb3React()
  const [ initialized, setInitialized ] = useState<boolean>(false)
  useEffect(() => {
    // const init = async () => {
    //   try {
    //     await connector.activate()
    //   } catch (error) {
    //     console.error({ error })
    //   }
    //   setInitialized(true)
    // }
    // init()
    setInitialized(true)
  }, [])

  if (!initialized) {
    return <Page>
      <Container>
        <Loader />
      </Container>
    </Page>
  }

  return <HashRouter>
    <Switch>
      <Route path='/receive'><ClaimPage /></Route>
      <Route path='/claim/:linkKey'><ShortLinkPage /></Route>
      <Route path='/qr/:qrId'><QR /></Route>
      <Route exact path='/'><HomePage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </HashRouter>
}

export default AppRouter