import { TWalletOption } from 'types'

type TSortWallets = (wallets: (TWalletOption)[]) => TWalletOption[]

const sortWallets: TSortWallets = (wallets) => {
  
  return walletsFiltered.sort((a: TWalletOption, b) => {
    return Number(a.recommended)
  })
}

export default sortWallets
