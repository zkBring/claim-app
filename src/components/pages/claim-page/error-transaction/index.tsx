import { FC } from 'react'
import {
  Image,
  Title,
  ButtonStyled
} from './styled-components'
import ErrorImageBlack from 'images/error-black.png'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import {
  defineExplorerURL
} from 'helpers'
const mapStateToProps = ({
  drop: {
    hash,
    chainId
  },
}: RootState) => ({
  hash,
  chainId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ErrorComponent: FC<ReduxType> = ({
  hash,
  chainId
}) => {
  return <>
    <Image src={ErrorImageBlack} />
    <Title>Transaction failed</Title>
    {hash && chainId && <ButtonStyled
      onClick={() => {
        window.open(`${defineExplorerURL(chainId)}/tx/${hash}`, '_blank')
      }}
      title='View in Explorer'
      appearance='default'
    />}
  </>
}

export default connect(mapStateToProps)(ErrorComponent)