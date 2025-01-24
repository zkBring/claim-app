import { FC } from 'react'
import {
  PoweredBy,
  PoweredByImage
} from './styled-components'
import BringLogo from 'images/bring-fun.png'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { defineApplicationConfig } from 'helpers'

const mapStateToProps = ({
  drop: { campaignId }
}: RootState) => ({
  campaignId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const PoweredByFooter: FC<ReduxType> = ({
  campaignId
}) => {
  const configs = defineApplicationConfig()
  return <PoweredBy onClick={() => {
    window.open('https://linkdrop.io', '_blank')
    plausibleApi.invokeEvent({
      eventName: 'powered_by_linkdrop_click',
      data: {
        campaignId: String(campaignId)
      }
    })
  }}>
    Powered by
    <PoweredByImage src={BringLogo} alt="Linkdrop Logo"/>
  </PoweredBy>
}


export default connect(mapStateToProps)(PoweredByFooter)