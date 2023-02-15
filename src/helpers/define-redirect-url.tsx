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