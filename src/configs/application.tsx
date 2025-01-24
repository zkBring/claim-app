import BringLogo from 'images/bring-fun.png'

type TApplicationParams = {
  highlightColor: string
  primaryTextColor: string
  additionalTextColor: string
  secondaryTextColor: string
  logo: string
  backgroundColor: string
  highlightHoverColor: string
  highlightActiveColor: string
  primaryText?: string
  primaryDescription?: string
  tokenImage?: string
  claimFinishedButton?: {
    title: string
    url: string
  }
}

type TConfig = Record<string, TApplicationParams>


const originalParams: TApplicationParams = {
  highlightColor: '#002A80',
  primaryTextColor: '#FFFFFF',
  additionalTextColor: '#B2B2B2',
  secondaryTextColor: '#000',
  logo: BringLogo,
  backgroundColor: '#000',
  highlightHoverColor: '#357AFF',
  highlightActiveColor: '#095AF5'
}

const applicationParams: TConfig = {
  zkbring: originalParams
}

export default applicationParams
