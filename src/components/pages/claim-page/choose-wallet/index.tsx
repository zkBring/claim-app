import { FC, useState, useEffect } from 'react'
import {
  TitleComponent,
  ScreenButton,
  Container,
  TextComponent,
  WalletIcon,
  AdditionalAction
} from './styled-components'
import { RootState } from 'data/store'
import { connect } from 'react-redux'
import { hooks as walletConnectHooks, walletConnect } from 'components/application/connectors/wallet-connect'
import ZerionLogo from 'images/zerion.png'
import AuthClient, { generateNonce } from "@walletconnect/auth-client"
const { REACT_APP_WC_PROJECT_ID } = process.env
 console.log({ REACT_APP_WC_PROJECT_ID })
const mapStateToProps = ({
  token: { name, image },
  drop: { tokenId, type }
}: RootState) => ({
  name, image, type, tokenId
})

type ReduxType = ReturnType<typeof mapStateToProps>

const ChooseWallet: FC<ReduxType> = () => {
  const [ client, setClient ] = useState<AuthClient | null>();
  useEffect(() => {
    if (!client) { return }
    client
      .request({
        aud: window.location.href,
        domain: window.location.hostname.split(".").slice(-2).join("."),
        chainId: "eip155:1",
        type: "eip4361",
        nonce: generateNonce(),
        statement: "Sign in with wallet.",
      })
      .then((res) => {
        console.log({ res })
      })
  }, [client])
  
  return <Container> 
    <WalletIcon src={ZerionLogo} /> 
    <TitleComponent>Connect your wallet</TitleComponent>
    <TextComponent>
      Claim NFT using your Zerion Wallet. Download the app or use another wallet.
    </TextComponent>
    <ScreenButton onClick={async () => {
      const authClient = await AuthClient.init({
        projectId: 'ecc4036f814562b41a5268adc86270fba1365471402006302e70169465b7ac18',
        metadata: {
          name: "Linkdrop-Test",
          description: "A dapp using WalletConnect AuthClient",
          url: "https://jazzy-donut-086baa.netlify.app/",
          icons: ["https://jazzy-donut-086baa.netlify.app/zerion.png"],
        },
      })
      

      authClient.on("auth_response", (authClientRes) => {
        console.log({ authClientRes })
      });

      
    }}>
      Use Zerion
    </ScreenButton>
    <AdditionalAction
      onClick={() => {
        walletConnect.activate()
      }}
    >Choose another wallet</AdditionalAction>
  </Container>
}

export default connect(mapStateToProps)(ChooseWallet)