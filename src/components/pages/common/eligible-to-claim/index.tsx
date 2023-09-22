import { FC } from 'react'
import {
  ContainerWidget,
  WidgetTitle,
  WidgetSubtitle,
  ButtonStyled,
  Image,
  UserAddress
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { shortenString } from 'helpers'
import EligibleToClaimImage from 'images/eligible-to-claim.png'
import { TProps } from './types'

const mapStateToProps = ({
  drop: {
    type
  },
  user: {
    address
  }
}: RootState) => ({
  type,
  address
})

type ReduxType = ReturnType<typeof mapStateToProps> & TProps

const EligibleToClaim: FC<ReduxType> = ({
  address,
  onSubmit
}) => {
  return <ContainerWidget>
    <Image src={EligibleToClaimImage}/>
    <WidgetTitle>You are eligible to claim</WidgetTitle>
    <WidgetSubtitle>All great, <UserAddress>{shortenString(address)}</UserAddress> is eligible to claim a digital asset</WidgetSubtitle>
    <ButtonStyled
      onClick={() => {
        onSubmit(address)
      }}
      appearance='action'
    >
      Proceed
    </ButtonStyled>
  </ContainerWidget>
}

export default connect(mapStateToProps)(EligibleToClaim)