import React, { FC } from 'react'
import {
  Title,
  Container,
  Subtitle,
  TokenImageContainer,
  NoteStyled,
  ScreenButton
} from './styled-components'
import { defineNetworkName, defineAccountsDeeplink, defineLedgerChain } from 'helpers'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  user: { address },
  token: { name, image },
  drop: { tokenId, amount, type, isManual, loading, chainId }
}: RootState) => ({
  name, image, type, tokenId, amount, address, isManual, loading, chainId
})


type ReduxType = ReturnType<typeof mapStateToProps>

const ChangeNetwork: FC<ReduxType> = ({
  chainId,
  name,
  tokenId,
  image,
  address
}) => {
  let chain = defineLedgerChain({ chainId: String(chainId) })
  const networkName = defineNetworkName(chainId)
  return <Container> 
    <Title>{name}</Title>
    {tokenId && <Subtitle>#{tokenId}</Subtitle>}
    {image && <TokenImageContainer src={image} alt={name} />}
    <NoteStyled type='warning' text={`You need a ${networkName} account to claim the NFT.`} />
  </Container>
}

export default connect(mapStateToProps)(ChangeNetwork)