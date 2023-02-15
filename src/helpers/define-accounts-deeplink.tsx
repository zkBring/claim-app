import { defineSystem } from 'helpers'
import { TSystem, TLedgerChain } from 'types'

const defineAccountsDeeplink = ({
  currency,
  address
}: {
  currency: TLedgerChain,
  address: string
}) => {
  const system: TSystem = defineSystem()
  switch (system) {
    case 'android':
    case 'ios':
    default:
      return `ledgerlive://accounts?currency=${currency}&address=${address}`
  }
}

export default defineAccountsDeeplink