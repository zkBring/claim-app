import { FC } from 'react'
import Icons from 'icons'
import applicationOptions from 'configs/application'
import { LinkdropHeaderLogo, LinkdropHeader, LinkdropHeaderBack } from './styled-components'
import TProps from './types'

const PageHeader: FC<TProps> = ({ backAction }) => {
  return  <LinkdropHeader>
    {backAction && <LinkdropHeaderBack onClick={backAction}>
      <Icons.ArrowLeftIcon />
    </LinkdropHeaderBack>}
    <LinkdropHeaderLogo src={applicationOptions.logo} alt="Application Logo" />
  </LinkdropHeader>
}

export default PageHeader