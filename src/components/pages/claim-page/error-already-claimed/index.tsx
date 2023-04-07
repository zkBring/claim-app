import { FC } from 'react'
import { Image, Title, Subtitle } from './styled-components'
import ExpiredError from 'images/expired-error.png'
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
    <Title>NFT already claimed</Title>
    <Subtitle>Please check your wallet</Subtitle>
  </>
}

export default connect(mapStateToProps)(ErrorComponent)