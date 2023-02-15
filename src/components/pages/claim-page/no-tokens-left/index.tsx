import React, { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { address },
}: RootState) => ({
  address,
})
type ReduxType = ReturnType<typeof mapStateToProps>

const NotTokensLeft: FC<ReduxType> = ({ address }) => {
  return <>
    Unfortunately you cannot claim drop, no tokens left
  </>
}

export default connect(mapStateToProps)(NotTokensLeft)