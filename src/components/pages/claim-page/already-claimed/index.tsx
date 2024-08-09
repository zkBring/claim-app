import { FC } from 'react'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { 
  TitleComponent,
  ButtonsContainer,
  TokenImageLarge,
  TokenImageContainer,
  DoneIcon,
  Subtitle,
  DoneIconERC20
} from './styled-components'
import {
  ERC20TokenPreview,
  ClaimingFinishedButton,
  PoweredByFooter,
  ClaimingFinishedExplorerButton
} from 'components/pages/common'
import AlreadyClaimedERC20 from 'images/already-claimed-erc20.png'

const mapStateToProps = ({
  drop: {
    type,
    amount,
    claiming_finished_description
  },
  token: {
    image,
    name,
    decimals
  }
}: RootState) => ({
  image,
  name,
  type,
  decimals,
  amount,
  claiming_finished_description
})

type ReduxType = ReturnType<typeof mapStateToProps>

const AlreadyClaimed: FC<ReduxType> = ({
  image,
  name,
  type,
  amount,
  decimals,
  claiming_finished_description
}) => {

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
  /> : <>
    {image && <TokenImageContainer>
      <DoneIcon />
      <TokenImageLarge
        src={image}
        alt={name}
      />
    </TokenImageContainer>}
  </>

  return <>
    {content}
    <TitleComponent>
      {type === 'ERC20' && <DoneIconERC20 src={AlreadyClaimedERC20} />}
      Already claimed
    </TitleComponent>
    <Subtitle>
      {claiming_finished_description || `Somebody has already claimed this link. In case it was you, find ${type === 'ERC20' ? 'tokens' : 'NFT'} in your wallet`}
     
    </Subtitle>
    <ButtonsContainer>
      <ClaimingFinishedButton alreadyClaimed />
      <ClaimingFinishedExplorerButton />
    </ButtonsContainer>
    <PoweredByFooter />
  </>
}

export default connect(mapStateToProps)(AlreadyClaimed)