type TDefineExplorerURL = ({
  linkParams,
  code,
  autoClaim,
  redirectToOnboarding,
  theme
}: {
  linkParams: string
  code: string
  autoClaim: string
  redirectToOnboarding: string,
  theme: string
}) => string | null

const defineRedirectUrl: TDefineExplorerURL = ({
  linkParams,
  code,
  autoClaim,
  redirectToOnboarding,
  theme = 'dark'
}) => {
  let redirectUrl = '/?'
  if (linkParams) {
    redirectUrl = atob(decodeURIComponent(linkParams)).replace('#/', '')
    // /receive?weiAmount=0&nftAddress=0xd3530da6eea7d4723decd3c22bfb19a61a1b2afb&tokenId=1&expirationTime=1900000000000&version=1&chainId=137&linkKey=1b1ba12d667d0f4a705a73135a3395bdc456a22324c66fd6de51ec2e83c314d5&linkdropMasterAddress=0x3f389a7d841edba3964ebd5accbaf76f7525b3be&linkdropSignerSignature=0xa637016f88d4e8b957ffebffa956d701278d236082ffaf5cbc6d5566f0ff9048299ad8031a2cec22af2b3ca46297e598c5b1d814da159895469528d34a03c0e01b&campaignId=1666612976522&w=ledgerlive
  }
  if (code) {
    redirectUrl = `/qr/${code}?`
  }
  if (autoClaim) {
    redirectUrl = `${redirectUrl}&autoClaim=true`
  }
  if (redirectToOnboarding) {
    redirectUrl = `${redirectUrl}&redirectToOnboarding=true`
  }
  if (theme) {
    redirectUrl = `${redirectUrl}&theme=${theme}`
  }
  return redirectUrl
}

export default defineRedirectUrl