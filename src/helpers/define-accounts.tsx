import { TAccount } from 'types'
import { defineLedgerChain } from 'helpers'

type TDefineAccounts = (accounts: TAccount[], chainId: string | number) => {
  accounts: TAccount[],
  mainAccount: string | undefined
}

const defineAccounts: TDefineAccounts = (accounts, chainId) => {
  let chain = defineLedgerChain({ chainId: String(chainId) })
  const accountsFiltered = (accounts as TAccount[])
  .filter(item => {
    if (chain === 'polygon') {
      return item.currency === chain
    }
    return item.currency === 'ethereum'
  })
  const mainAccountItem = accountsFiltered[0] || {}
  return {
    accounts: accountsFiltered,
    mainAccount: mainAccountItem.address
  }
}

export default defineAccounts