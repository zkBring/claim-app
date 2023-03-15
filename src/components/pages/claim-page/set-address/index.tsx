import { FC, useEffect, useState, useRef } from 'react'
import {
  Title,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  NoteStyled,
  InputStyled,
  Instructions,
  Networks
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { TokenActions } from 'data/store/reducers/token/types'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { Dispatch } from 'redux'
import NetworksImage from 'images/networks.png'
import { resolveENS, throttling, defineJSONRpcUrl } from 'helpers'
import { ethers } from 'ethers'

const { REACT_APP_INFURA_ID = '' } = process.env

const jsonRpcUrl = defineJSONRpcUrl({ chainId: 1, infuraPk: REACT_APP_INFURA_ID })
const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)

const mapStateToProps = ({
  token: { name, image },
  user: { address, provider },
  drop: { tokenId, amount, type, isManual, loading }
}: RootState) => ({
  name,
  image,
  type,
  address,
  tokenId,
  amount,
  provider,
  isManual,
  loading
})

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<TokenActions> & IAppDispatch) => {
  return {
    claimERC1155: (address: string) => dispatch(
      dropAsyncActions.claimERC1155(address, true)
    ),
    claimERC721: (address: string) => dispatch(
      dropAsyncActions.claimERC721(address, true)
    ),
    claimERC20: (address: string) => dispatch(
      dropAsyncActions.claimERC20(address, true)
    )
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps> 

const SetAddress: FC<ReduxType> = ({
  name,
  type,
  tokenId,
  amount,
  image,
  claimERC1155,
  claimERC721,
  claimERC20,
  isManual,
  loading
}) => {

  const [ currentAddress, setCurrentAddress ] = useState<string>('')
  const [ isValid, setIsValid ] = useState<boolean>(false)
  const [ isInputErrored, setIsInputErrored ] = useState<boolean>(false)
  const [ isChecking, setIsChecking ] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const throttled = useRef(throttling(async () => {
    setIsValid(false)
    setIsInputErrored(false)
    if (inputRef.current === null) {
      return
    }
    if (inputRef.current.value.indexOf('.') === -1 && !inputRef.current.value.startsWith('0x')) {
      return
    }
    setIsChecking(true)
    const resolved = await resolveENS(inputRef.current.value, provider)
    setIsChecking(false)
    setIsInputErrored(resolved === null)
    return setIsValid(Boolean(resolved))
  }, 300))

  useEffect(() => {
    if (!currentAddress) {
      return setIsValid(false)
    }
    
    throttled.current()
    
  }, [currentAddress])

  return <Container> 
    <Title>{name}</Title>
    {tokenId && <Subtitle>#{tokenId}</Subtitle>}
    {image && <TokenImageContainer src={image} alt={name} />}
    {!isManual && <NoteStyled type='default' text='Here is a preview of the NFT you’re about to receive' />}
    <Instructions>
      <Networks src={NetworksImage} />
      Enter your Ethereum/Polygon address to receive your NFT
    </Instructions>

    <InputStyled
      refProp={inputRef}
      value={currentAddress}
      error={isInputErrored ? "Seems you're offline" : undefined}
      onChange={value => {
        setCurrentAddress(value);
        return value
      }}
      placeholder='0x… address or ENS name'
    />
    <ScreenButton
      disabled={
        (type === 'ERC1155' && (!tokenId || !amount)) ||
        (type === 'ERC721' && (!tokenId)) ||
        (type === 'ERC20' && (!amount)) ||
        !currentAddress ||
        !isValid ||
        loading
      }
      title={isChecking ? 'Resolving ENS' : 'Receive my NFT'}
      loading={isChecking || loading}
      appearance={!isChecking && !loading ? 'default' : 'inverted'}
      onClick={() => {
        if (type === 'ERC1155') {
          return claimERC1155(currentAddress)
        }
        if (type === 'ERC721') {
          return claimERC721(currentAddress)
        }
        if (type === 'ERC20') {
          return claimERC20(currentAddress)
        }
      }}
    />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetAddress)