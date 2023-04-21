import { TWalletOption } from 'types'

type TSortWallets = (wallets: (TWalletOption | undefined)[]) => TWalletOption[]

const sortWallets: TSortWallets = (wallets) => {
  const walletsFiltered = wallets.filter(wallet => wallet)
  walletsFiltered.sort((a,b) => Number(b?.recommended || 0) - Number(a?.recommended || 0))
  return walletsFiltered as TWalletOption[]
}

export default sortWallets
