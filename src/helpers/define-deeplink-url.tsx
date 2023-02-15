const { REACT_APP_LL_APP_ID } = process.env 

type TDefineExplorerURL = ({
  linkParams,
  code,
  autoClaim,
  redirectToOnboarding 
}: {
  linkParams?: string
  code?: string
  autoClaim?: string
  redirectToOnboarding?: string,
}) => string

const defineDeeplinkUrl: TDefineExplorerURL = ({
  linkParams,
  code,
  autoClaim,
  redirectToOnboarding
}) => {

  let initialUrl = `ledgerlive://discover/${REACT_APP_LL_APP_ID}?linkParams=${linkParams}`
  if (autoClaim) {
    initialUrl = `${initialUrl}&autoClaim=true`
  }

  if (redirectToOnboarding) {
    initialUrl = `${initialUrl}&redirectToOnboarding=true`
  }

  if (code) {
    initialUrl = `${initialUrl}&code=${code}`
  }

  return initialUrl
}

export default defineDeeplinkUrl