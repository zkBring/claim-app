import { FC } from 'react'
import { Image } from './styled-components'
import ExpiredError from 'images/expired-error.png'
import {Title, Subtitle } from 'components/pages/common/styles/styled-components'
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

const ErrorComponent: FC<ReduxType> = ({
  type
}) => {
  return <>
    <Image src={ExpiredError} />
    <Title>{type === 'ERC20' ? 'Tokens' : 'NFT'} already claimed</Title>
    <Subtitle>Please check your wallet</Subtitle>
  </>
}

export default connect(mapStateToProps)(ErrorComponent)