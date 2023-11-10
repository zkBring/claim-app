import { FC, useState, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  Link,
  AdditionalTextComponent,
  Hr
} from './styled-components'
import { RootState, IAppDispatch } from 'data/store'
import { connect } from 'react-redux'
import ZerionLogo from 'images/zerion.png'
import AuthClient, { generateNonce } from "@walletconnect/auth-client"
import { defineSystem, getHashVariables } from 'helpers'
import { Dispatch } from 'redux'
import * as userAsyncActions from 'data/store/reducers/user/async-actions'
import { DropActions } from 'data/store/reducers/drop/types'
import { UserActions } from 'data/store/reducers/user/types'
import { ScreenLoader } from './components'
import { TDropType } from 'types'
import TProps from './types'

const { REACT_APP_WC_PROJECT_ID } = process.env

const mapDispatcherToProps = (dispatch: Dispatch<DropActions> & Dispatch<UserActions> & IAppDispatch) => {
  return {
    updateUserData: (
      address: string,
      chainId: number,
      callback?: () => void
    ) => dispatch(userAsyncActions.updateUserData(
      address,
      chainId,
      undefined,
      undefined,
      callback
    ))
  }
}

const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type, chainId }
}: RootState) => ({
  name, image, type, tokenId, chainId
})

type ReduxType = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatcherToProps>

const defineUrlHref = () => {
  const system = defineSystem()
  switch (system) {
    case 'android':
      return 'https://play.google.com/store/apps/details?id=io.zerion.android&_branch_match_id=1131934258497997120&utm_source=zerion_homepage&utm_campaign=wallet_launch&utm_medium=homepage&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8nMy9arSi3KzM/Ty8zXTzE0zDfz9DPIKkwCAJ6OLGAiAAAA&pli=1'
    case 'ios':
      return 'https://apps.apple.com/ru/app/zerion-crypto-wallet-defi/id1456732565?l=en'
  }
}

const defineButton = (
  setClient: (client: AuthClient) => void,
  updateUserData: (
    address: string,
    chainId: number,
    callback?: () => void
  ) => void,
  callback?: () => void
) => {
  return <ScreenButton
    appearance='action'
    onClick={async () => {
      const authClient = await AuthClient.init({
        projectId: REACT_APP_WC_PROJECT_ID as string,
        metadata: {
          name: "Linkdrop",
          description: "A dapp using WalletConnect AuthClient",
          url: window.location.host,
          icons: ["/zerion.png"],
        }
      })

      setClient(authClient)
      authClient.on("auth_response", ({ params }) => {
        // @ts-ignore
        const validResponse = Boolean(params && params.result && params.result.p)
        if (validResponse) {
          // @ts-ignore
          const { iss } = params.result.p
          const walletData = iss.split(":")
          const walletAddress = walletData[4]
          const walletChainId = walletData[3]
          updateUserData(
            walletAddress,
            walletChainId,
            callback
          )
        } else {
          // @ts-ignore
          console.error(params.message)
        }
      })
    }
  }>
    Use Zerion
  </ScreenButton>
}

const renderTexts = (
  type: TDropType
) => {
  return <>
    <WalletIcon src={ZerionLogo} /> 
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Claim {type === 'ERC20' ? 'tokens' : 'NFT'} using your Zerion Wallet. <Link target="_blank" href={defineUrlHref()}>Download the app</Link> or use another wallet.
    </TextComponent>
  </>
}

const ZerionConnection: FC<ReduxType & TProps> = ({
  updateUserData,
  chainId,
  type,
  setStepCallback
}) => {
  const [ client, setClient ] = useState<AuthClient | null>()
  const [ loading, setLoading ] = useState<boolean>(false)
  const handleUpdateUser = (
    address: string,
    chainId: number
  ) => {
    updateUserData(
      address,
      chainId,
      setStepCallback
    )
  }
  useEffect(() => {
    if (!client) { return }
    client
      .request({
        aud: window.location.href,
        domain: window.location.hostname.split(".").slice(-2).join("."),
        chainId: `eip155:${chainId as number}`,
        nonce: generateNonce(),
        statement: "Sign in with Zerion Wallet"
      })
      .then(({ uri }) => {
        if (!uri) { return }
        setLoading(true)
        const href = `zerion://wc?uri=${encodeURIComponent(uri)}`
        window.location.href = href
      })
      .catch(err => {
        setLoading(false)
      })
  }, [client])

  if (loading) {  
    return <ScreenLoader onClose={() => {
      setLoading(false)
    }}/>
  }
  return <Container> 
    {renderTexts(type as TDropType)}
    {defineButton(
      setClient,
      handleUpdateUser,
      setStepCallback
    )}
    <Hr />
    <AdditionalTextComponent>Once you approve the connection with your wallet, return to this page to claim {type === 'ERC20' ? 'tokens' : 'the NFT'}.</AdditionalTextComponent>
  </Container>
}

export default connect(mapStateToProps, mapDispatcherToProps)(ZerionConnection)