import { TWalletOption } from 'types'

type TSortWallets = (wallets: (TWalletOption)[]) => TWalletOption[]

const sortWallets: TSortWallets = (wallets) => {
  return wallets
}

export default sortWallets
