import { defineSystem } from 'helpers'
import { TSystem } from 'types'

const defineApplicationUrl = () => {
  const system: TSystem = defineSystem()
  switch (system) {
    case 'android':
      return 'https://play.google.com/store/apps/details?id=com.ledger.live&hl=en&gl=US'
    case 'ios':
      return 'https://apps.apple.com/ru/app/ledger-live-crypto-nft-app/id1361671700'
    default:
      return 'https://www.ledger.com/ledger-live'
  }
}

export default defineApplicationUrl