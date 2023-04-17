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
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  drop: {
    type
  },
}: RootState) => ({
  type
})

type ReduxType = ReturnType<typeof mapStateToProps>

const DownloadAwait: FC<ReduxType> = ({
  type
}) => {
  return <ContainerWidget>
    <WidgetTitle>Download extension</WidgetTitle>
    <WidgetSubtitle>Follow instruction to claim {type === 'ERC20' ? 'tokens' : 'an NFT'}</WidgetSubtitle>
    <List>
      <ListItem>Download web3 extension, we recommend <Link href='https://metamask.io/download/' target='_blank'>Metamask</Link></ListItem>
      <ListItem>Once you completed refresh this page by clicking on button below</ListItem>
    </List>
    <ButtonStyled
      onClick={() => window.location.reload()}
      appearance='action'
    >
      Refresh page
    </ButtonStyled>
  </ContainerWidget>
}

export default connect(mapStateToProps)(DownloadAwait)