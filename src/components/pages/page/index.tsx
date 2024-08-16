import { FC } from 'react'
import {
  Page,
  MainContent,
  Content
} from './styled-components'
import { ThemeProvider } from 'styled-components'
import { AppHeader } from 'components/pages/common'
import themes from 'themes'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { PageProps } from './types'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'

const mapStateToProps = ({
  drop: { theme },
  user: { address, chainId }
}: RootState) => ({
  address,
  theme,
  chainId
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    switchNetwork: (
      chain: number,
      callback: () => void
    ) => dispatch(userAsyncActions.switchNetwork(
      chain,
      callback
    )),
    logout: () => dispatch(userAsyncActions.logout())
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const PageComponent: FC<PageProps & ReduxType> = ({
  children,
  chainId,
  address,
  switchNetwork,
  logout
}) => {
  const currentTheme = themes.light
  return <ThemeProvider theme={currentTheme}>
    <Page>
      <MainContent>
        <AppHeader
          chainId={chainId}
          address={address}
          logout={logout}
        />
        <Content>
          {children}              
        </Content>
      </MainContent>
    </Page>
  </ThemeProvider>
}


export default connect(mapStateToProps, mapDispatcherToProps)(PageComponent)
