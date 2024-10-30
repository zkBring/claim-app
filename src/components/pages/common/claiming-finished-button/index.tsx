import {
  FC,
  useEffect,
  useState
} from 'react'
import {
} from 'components/common'
import { ButtonStyled, LoaderStyled } from './styled-components'
import { plausibleApi } from 'data/api'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { TProps } from './types' 
import { useConnect } from 'wagmi'

const mapStateToProps = ({
  drop: {
    campaignId,
    claiming_finished_button_title,
    claiming_finished_button_url,
    claiming_finished_auto_redirect,
    wallet
  },
}: RootState) => ({
  campaignId,
  claiming_finished_button_title,
  claiming_finished_button_url,
  claiming_finished_auto_redirect,
  wallet
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ClaimingFinishedButton: FC<ReduxType & TProps> = ({
  campaignId,
  claiming_finished_button_title,
  claiming_finished_button_url,
  claiming_finished_auto_redirect,
  wallet,
  alreadyClaimed
}) => {
  const { connectors } = useConnect()
  const [ isSmartWallet, setIsSmartWallet ] = useState<boolean>(false)
  const [ loading, setLoading ] = useState<boolean>(true)

  useEffect(( ) => {
    const init = async () => {
      const coinbaseConnector = connectors.find(connector => connector.id === "coinbaseWalletSDK")
      if (coinbaseConnector) {
        const isAuthorized = await coinbaseConnector?.isAuthorized()
        setIsSmartWallet(isAuthorized)
      }

      if (claiming_finished_auto_redirect) {
        if (claiming_finished_button_url) {
          window.location.href = claiming_finished_button_url
  
          return
        }
      }

      setLoading(false)
    }

    init()
  }, [])

  if (loading) {
    return <LoaderStyled size='small' />
  }

  if (claiming_finished_button_url) {
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
      {claiming_finished_button_title || 'Redirect'}
    </ButtonStyled>
  }

  if (alreadyClaimed && wallet === 'coinbase_smart_wallet') {
    return <ButtonStyled
      href="https://keys.coinbase.com"
      target='_blank'
      appearance='action'
    >
      See in Wallet
    </ButtonStyled>
  }

  if (isSmartWallet) {
    return <ButtonStyled
      href="https://keys.coinbase.com"
      target='_blank'
      appearance='action'
    >
      See in Wallet
    </ButtonStyled>
  } 
  
  return null
}

export default connect(mapStateToProps)(ClaimingFinishedButton)
