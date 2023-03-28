import { FC, useEffect, useState } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom'
import {
  NotFound,
  ClaimPage,
  Page,
  QR,
  HomePage
} from 'components/pages'
import { Container } from './styled-components'
import { Loader } from 'components/common'

const AppRouter: FC = () => {
  const [ initialized, setInitialized ] = useState<boolean>(false)
  useEffect(() => {
    const init = async () => {
      // try {
      //   await connector.activate()
      // } catch (error) {
      //   console.error({ error })
      // }
      setInitialized(true)
    }
    init()
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
      <Route path='/redeem/:claimCode'><ClaimPage /></Route>
      <Route path='/qr/:qrId'><QR /></Route>
      <Route exact path='/'><HomePage /></Route>
      <Route path='*'><NotFound /></Route>
    </Switch>
  </HashRouter>
}

export default AppRouter