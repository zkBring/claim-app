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
import { resolveENS, throttling, defineJSONRpcUrl, shortenString } from 'helpers'
import {  ERC20TokenPreview } from 'components/pages/common'
import { ethers } from 'ethers'
import TProps from './types'

const { REACT_APP_INFURA_ID = '' } = process.env

const jsonRpcUrl = defineJSONRpcUrl({ chainId: 1, infuraPk: REACT_APP_INFURA_ID })
const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl)

const mapStateToProps = ({
  token: { name, image, decimals },
  user: { address, provider },
  drop: { tokenId, amount, type, isManual, loading,  }
}: RootState) => ({
  name,
  image,
  type,
  address,
  tokenId,
  amount,
  provider,
  isManual,
  loading,
  decimals
})

type ReduxType = ReturnType<typeof mapStateToProps>

const SetAddress: FC<ReduxType & TProps> = ({
  name,
  type,
  tokenId,
  amount,
  image,
  onSubmit,
  isManual,
  loading,
  decimals
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

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='initial'
  /> : <>
    <Title>{name}</Title>
    {tokenId && <Subtitle>#{shortenString(tokenId)}</Subtitle>}
    {image && <TokenImageContainer src={image} alt={name} />}
  </>

  return <Container> 
    {content}
    {!isManual && <NoteStyled type='default' text={`Preview of ${type === 'ERC20' ? 'tokens' : 'the NFT'} you're about to receive. All fees will be handled by Sponsor`} />}
    <Instructions>
      <Networks src={NetworksImage} />
      Enter your Ethereum/Polygon address or ENS to receive your NFT
    </Instructions>

    <InputStyled
      refProp={inputRef}
      value={currentAddress}
      error={isInputErrored ? "Seems you're offline" : undefined}
      onChange={value => {
        setCurrentAddress(value);
        return value
      }}
      placeholder='0xAdd6e33... or ENS'
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
      title={isChecking ? 'Resolving ENS' : `Receive ${type === 'ERC20' ? 'tokens' : 'my NFT'}`}
      loading={isChecking || loading}
      appearance={!isChecking && !loading ? 'action' : 'default'}
      onClick={() => {
        onSubmit(currentAddress)
      }}
    />
  </Container>
}

export default connect(mapStateToProps)(SetAddress)