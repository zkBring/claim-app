import { FC } from 'react'
import {
  ContainerWidget,
  WidgetTitle,
  WidgetSubtitle,
  ButtonStyled,
  List,
  ListItem,
  Link
} from './styled-components'

const DownloadAwait: FC = () => {
  return <ContainerWidget>
    <WidgetTitle>Download extension</WidgetTitle>
    <WidgetSubtitle>Follow instruction to claim NFT</WidgetSubtitle>
    <List>
      <ListItem>Download web3 extension, we recommend <Link href='https://metamask.io/download/' target='_blank'>Metamask</Link></ListItem>
      <ListItem>Once you completed refresh this page by clicking on button below</ListItem>
    </List>
    <ButtonStyled onClick={() => window.location.reload()}>
      Refresh page
    </ButtonStyled>
  </ContainerWidget>
}

export default DownloadAwait