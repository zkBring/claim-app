import LinkdropLogo from 'images/linkdrop-header.png'
import LumasLogo from 'images/lumas.png'

type TApplicationParams = {
  highlightColor: string
  primaryTextColor: string
  logo: string
  backgroundColor: string
}

type TConfig = Record<string, TApplicationParams>


const originalParams: TApplicationParams = {
  highlightColor: '#0C5EFF',
  primaryTextColor: '#121212',
  logo: LinkdropLogo,
  backgroundColor: '#F7F7FB'
}

const lumasParams: TApplicationParams = {
  highlightColor: '#8719CB',
  primaryTextColor: '#121212',
  logo: LumasLogo,
  backgroundColor: '#F7F7FB'
}

const applicationParams: TConfig = {
  linkdrop: originalParams,
  lumas: lumasParams
}


export default applicationParams