import { TLedgerChain } from 'types'

type TDefineLedgerChain = ({ chainId } : { chainId: string }) => TLedgerChain
const defineLedgerChain: TDefineLedgerChain = ({ chainId }) => {
  if (chainId === '137') {
    return 'polygon'
  }
  return 'ethereum'
}

export default defineLedgerChain