import { FC } from 'react'
import { Image, Title, Subtitle, ButtonStyled, AdditionalAction } from './styled-components'
import GasPrice from 'images/gas-price.png'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import * as dropActions from 'data/store/reducers/drop/actions'
import { TDropStep } from 'types'

const mapStateToProps = ({
  drop: { type, addressIsManuallySet },
  user: { signer }
}: RootState) => ({
  type,
  addressIsManuallySet,
  signer
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
    claimERC1155: () => dispatch(
      dropAsyncActions.claimERC1155()
    ),
    claimERC721: () => dispatch(
      dropAsyncActions.claimERC721()
    ),
    claimERC20: () => dispatch(
      dropAsyncActions.claimERC20()
    ),
    setStep: (step: TDropStep) => dispatch(dropActions.setStep(step))
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const HighGasPrice: FC<ReduxType> = ({
  addressIsManuallySet,
  type,
  claimERC1155,
  claimERC721,
  claimERC20,
  signer,
  setStep
}) => {
  return <>
    <Image src={GasPrice} />
    <Title>Gas price is high</Title>
    <Subtitle>Network is busy. Carry gas cost by yourself or try a bit later</Subtitle>
    <ButtonStyled
      appearance='default'
      onClick={() => { setStep('initial') }}
    >
      Claim later
    </ButtonStyled>
    {!addressIsManuallySet && signer && <AdditionalAction
      onClick={() => {
        if (type === 'ERC1155') {
          return claimERC1155()
        }
        if (type === 'ERC721') {
          return claimERC721()
        }
        if (type === 'ERC20') {
          return claimERC20()
        }
      }}
    >
      Nevermind, I pay for gas
    </AdditionalAction>}
  </>
}

export default connect(mapStateToProps, mapDispatcherToProps)(HighGasPrice)