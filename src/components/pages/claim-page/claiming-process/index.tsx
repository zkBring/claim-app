import { FC, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { defineExplorerURL } from 'helpers'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { Link } from 'components/common'

const mapStateToProps = ({
  drop: {
    hash,
    chainId,
    type,
    amount
  },
  token: {
    name,
    image,
    decimals,
    
  }
}: RootState) => ({
  hash,
  chainId,
  name,
  image,
  decimals,
  type,
  amount
})

const mapDispatcherToProps = (dispatch: IAppDispatch) => {
  return {
    checkTransactionStatus: () => dispatch(
      dropAsyncActions.checkTransactionStatus()
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const ClaimingProcess: FC<ReduxType> = ({
  hash,
  chainId,
  checkTransactionStatus,
  name,
  image,
  amount,
  decimals,
  type
}) => {
  useEffect(() => {
    if (!hash) { return }
    checkTransactionStatus()
  }, [])

  const explorerUrl = `${defineExplorerURL(chainId as number)}/tx/${hash}`

  const explorerButton = hash ? <ScreenButton
    href={explorerUrl}
    loading
    disabled
    appearance='default'
  /> : null

  const tokenImage = type === 'ERC20' ?
    <ERC20TokenPreview
      name={name}
      image={image as string}
      amount={amount as string}
      decimals={decimals}
      status='initial'
    /> : <TokenImageContainer src={image as string} alt={name} />

  return <Container> 
    {tokenImage}
    {type !== 'ERC20' && <TitleComponent>{name}</TitleComponent>}
    <Subtitle>
      Transaction is in process. View on <Link href={explorerUrl} target="_blank">Explorer</Link>
    </Subtitle>
    {explorerButton}
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ClaimingProcess)
