import { FC } from 'react'
import Icons from 'icons'
import {
  // HeaderLogo,
  Header,
  // HeaderBack,
  NetworkIndicatorStyled,
  Account,
  Address,
  Logout
} from './styled-components'
import TProps from './types'
import {
  defineApplicationConfig,
  shortenString
} from 'helpers'

const PageHeader: FC<TProps> = ({
  // backAction,
  // title,
  chainId,
  address,
  logout
}) => {
  return  <Header>
    
    <NetworkIndicatorStyled
      chainId={chainId}
    />
    {address && <Account>
      <Address>
        {shortenString(address)}
      </Address>
      
    </Account>}
    {address && <Logout
      onClick={() => {
        logout()
      }}
    >
      <Icons.LogoutIcon />
    </Logout>}
  </Header>
}

export default (PageHeader)


// {backAction && <HeaderBack onClick={backAction}>
//       <Icons.ArrowLeftIcon />
//     </HeaderBack>}
//     {/* @ts-ignore */}
//     {title || <HeaderLogo src={config.logo} alt="Application Logo" />}