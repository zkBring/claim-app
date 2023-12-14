import { FC } from 'react'
import { ButtonStyled } from './styled-components'
import { defineExplorerURL, defineApplicationConfig } from 'helpers'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
const config = defineApplicationConfig()

const mapStateToProps = ({
  drop: {
    chainId,
    hash,
    campaignId
  }
}: RootState) => ({
  chainId,
  hash,
  campaignId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinishedSecondaryButton: FC<ReduxType> = ({
  chainId,
  hash,
  campaignId
}) => {
  if (
    config &&
    config.claimFinishedButton
  ) {
    return <ButtonStyled
      onClick={() => {
        window.open((config.claimFinishedButton || {}).url, '_blank')
      }}
      title={config.claimFinishedButton.title}
      appearance='default'
    />
  }
  const explorerUrl = chainId && hash ? <ButtonStyled
    onClick={() => {
      plausibleApi.invokeEvent({
        eventName: 'click_explorer',
        data: {
          campaignId: campaignId as string,
        }
      })
      window.open(`${defineExplorerURL(chainId)}/tx/${hash}`, '_blank')
    }}
    title='View in Explorer'
    appearance='default'
  /> : null

  return explorerUrl
}

export default connect(mapStateToProps)(ClaimingFinishedSecondaryButton)
