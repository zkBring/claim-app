import { FC, useEffect, useState } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  Subtitle,
  TokenImageContainer,
  TextComponent
} from './styled-components'
import { ERC20TokenPreview, PoweredByFooter } from 'components/pages/common'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import { shortenString, defineSystem, getWalletDeeplink } from 'helpers'
import * as dropActions from 'data/store/reducers/drop/actions'
import { Dispatch } from 'redux'
import { DropActions } from 'data/store/reducers/drop/types'
import { useConnect } from 'wagmi'
import { TDropStep, TDropType, TWalletName } from 'types'
import { plausibleApi } from 'data/api'
import * as dropAsyncActions from 'data/store/reducers/drop/async-actions'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const { REACT_APP_CLIENT } = process.env
const mapStateToProps = ({
  token: {
    name,
    image,
    decimals
  },
  drop: {
    tokenId,
    type,
    campaignId,
    amount,
    wallet,
    chainId,
    preferredWalletOn,
    additionalWalletsOn
  },
  user: {
    address
  }
}: RootState) => ({
  name,
  image,
  type,
  tokenId,
  address,
  campaignId,
  amount,
  decimals,
  wallet,
  chainId,
  preferredWalletOn,
  additionalWalletsOn
})

const mapDispatcherToProps = (dispatch: IAppDispatch & Dispatch<DropActions>) => {
  return {
    setStep: (step: TDropStep) => dispatch(
      dropActions.setStep(step)
    ),
    setAutoclaim: (autoclaim: boolean) => dispatch(
      dropActions.setAutoclaim(autoclaim)
    ),
    deeplinkRedirect: (
      deeplink: string,
      walletId: TWalletName,
      redirectCallback: () => void
    ) => dispatch(dropAsyncActions.deeplinkRedirect(deeplink, walletId, redirectCallback)),
  }
}

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const SetConnector: FC<ReduxType> = ({
  name,
  tokenId,
  image,
  setStep,
  address,
  type,
  campaignId,
  chainId,
  amount,
  decimals,
  additionalWalletsOn,
  wallet,
  deeplinkRedirect,
  setAutoclaim
}) => {
  const { connect, connectors } = useConnect()
  const injected = connectors.find(connector => connector.id === 'injected')
  const { open } = useWeb3Modal()

  const system = defineSystem()
  const [ initialized, setInitialized ] = useState<boolean>(false)

  useEffect(() => {
    plausibleApi.invokeEvent({
      eventName: 'claimpage_open',
      data: {
        campaignId: campaignId as string,
        status: 'loaded'
      }
    })
  }, [])

  useEffect(() => {
    if(window &&
      //@ts-ignore
      window.ethereum &&
      (
        // @ts-ignore
        window.ethereum.isCoinbaseWallet ||
        window.ethereum.isOneInchIOSWallet ||
        window.ethereum.isOneInchAndroidWallet ||
        window.ethereum.isOneInchAndroidWallet ||
        // @ts-ignore
        window.okxwallet
      ) &&
      system !== 'desktop' && 
      injected
    ) {
      return connect({ connector: injected })
    } else {
      setInitialized(true)
    }
  }, [])

  const content = type === 'ERC20' ? <ERC20TokenPreview
    name={name}
    image={image as string}
    amount={amount as string}
    decimals={decimals}
    status='initial'
  /> : <>
    {image && <TokenImageContainer src={image} alt={name} />}
    <TitleComponent>{name}</TitleComponent>
    <TextComponent>
      Here is a preview of the NFT you’re about to receive
    </TextComponent>
  </>

  return <Container> 
    {content}
    <ScreenButton
      appearance='action'
      disabled={!initialized}
      onClick={() => {
        plausibleApi.invokeEvent({
          eventName: 'claimpage_click',
          data: {
            campaignId: campaignId as string
          }
        })
        // connect to wallet if has injected on mobile
        if (
          !address &&
          injected &&
          window.ethereum &&
          system !== 'desktop' &&
          injected.name !== 'Brave Wallet'
        ) {
          return connect({ connector: injected })
        }

        
        if (!additionalWalletsOn) {
          if (
            wallet === 'coinbase_smart_wallet'
          ) {
            const coinbase = connectors.find(connector => connector.id === 'coinbaseWalletSDK')
            if (coinbase) {
              setAutoclaim(true)
              return connect({ connector: coinbase })
            }
          }

          if (
            wallet === 'walletconnect'
          ) {
            setAutoclaim(true)
            return open()
          }

          if (
            wallet === 'metamask'
          ) {
            if (injected) {
              setAutoclaim(true)
              return connect({ connector: injected })
            }
          }

          if (
            [
              'coinbase_wallet',
              'wallet_1inch',
              'trust',
              'rainbow',
              'imtoken',
              'okx_wallet'
            ].includes(
              String(wallet)
            )
          ) {
            const deeplink = getWalletDeeplink(
              wallet as TWalletName,
              system,
              window.location.href,
              chainId
            )

            if (deeplink) {
              return deeplinkRedirect(
                deeplink,
                wallet as TWalletName,
                () => setStep('wallet_redirect_await')
              )
            }
            
          }
        }

        setStep('wallets_list')

      }
    }>
      Claim
    </ScreenButton>
    <PoweredByFooter />
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(SetConnector)