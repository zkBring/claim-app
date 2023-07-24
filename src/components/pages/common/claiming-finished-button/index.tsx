import { FC } from 'react'
import { ButtonStyled } from './styled-components'
import { defineOpenseaURL } from 'helpers'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'

const mapStateToProps = ({
  drop: {
    chainId,
    tokenId,
    tokenAddress,
    campaignId,
    type,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_description
  },
  user: {
    address,
    email
  }
}: RootState) => ({
  chainId,
  tokenId,
  type,
  tokenAddress,
  campaignId,
  claiming_finished_button_title,
  claiming_finished_button_url,
  claiming_finished_description,
  address,
  email
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinishedButton: FC<ReduxType> = ({
  tokenId,
  tokenAddress,
  chainId,
  campaignId,
  type,
  claiming_finished_button_title,
  claiming_finished_button_url,
  email
}) => {
  if (claiming_finished_button_url && claiming_finished_button_title) {
    return <ButtonStyled
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'click_custom_redirect_button',
          data: {
            campaignId: campaignId as string,
          }
        })
        window.open(claiming_finished_button_url, '_blank')
      }}
      appearance='action'
    >
      {claiming_finished_button_title}
    </ButtonStyled>
  }
  if (email) {
    return <ButtonStyled
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'open_crossmint',
          data: {
            campaignId: campaignId as string,
          }
        })
        window.open('https://www.crossmint.com/user/collection', '_blank')
      }}
      appearance='action'
    >
      Go to Crossmint
    </ButtonStyled>
  }
  if (type === 'ERC20') {
    return null
  }
  if (!tokenId || !tokenAddress || !chainId) { return null }
  const watchTokenUrl = defineOpenseaURL(
    chainId,
    tokenAddress,
    tokenId
  )
  return <ButtonStyled
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_redirect_button',
        data: {
          campaignId: campaignId as string,
        }
      })
      window.open(watchTokenUrl, '_blank')
    }}
    appearance='action'
  >
    View on OpenSea
  </ButtonStyled>
}

export default connect(mapStateToProps)(ClaimingFinishedButton)
