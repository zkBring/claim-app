import { FC, useEffect } from 'react'
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
import { plausibleApi } from 'data/api'

const mapStateToProps = ({
  drop: { type, addressIsManuallySet, campaignId },
  user: { signer }
}: RootState) => ({
  type,
  addressIsManuallySet,
  signer,
  campaignId
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
  setStep,
  campaignId
}) => {

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'gas_price_high',
      data: {
        campaignId: campaignId as string,
      }
    })
  }, [])

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
        plausibleApi.invokeEvent({
          eventName: 'user_covered_gas',
          data: {
            campaignId: campaignId as string,
          }
        })
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