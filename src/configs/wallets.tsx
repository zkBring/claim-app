import { TWalletName } from 'types'

const _withoutProtocol = (url: string) => url.replace(/(^\w+:|^)\/\//, '')

type TWalletDeeplink = (url: string) => string | null

type TWallet = {
  id: string,
  name: string,
  chains: number[],
  walletURL?: string | null,
  dappStoreUrl?: string | null,
  walletURLIos?: string | null,
  mobile: {
    android: {
      support: boolean,
      deepLink?: TWalletDeeplink
    },
    ios: {
      support: boolean,
      deepLink?: TWalletDeeplink
    }
  }
}

type TWallets = Record<TWalletName, TWallet>

const wallets: TWallets = {
  metamask: {
    id: 'metamask',
    name: 'MetaMask',
    chains: [1, 5, 137, 80001],
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://metamask.app.link/dapp/${_withoutProtocol(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://metamask.app.link/dapp/${_withoutProtocol(url)}`
      }
    },
  },
  crossmint: {
    id: 'crossmint',
    name: 'Crossmint',
    chains: [1, 5, 137, 80001],
    mobile: {
      android: {
        support: false
      },
      ios: {
        support: false,
      }
    },
  },
  status: {
    id: 'status',
    name: 'Status',
    walletURL: 'https://status.im/',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://get.status.im/browse/${_withoutProtocol(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://get.status.im/browse/${_withoutProtocol(url)}`
      }
    },
    chains: [1, 5, 137, 80001]
  },
  trust: {
    id: 'trust',
    name: 'Trust Wallet',
    walletURL: 'https://trustwalletapp.com',
    dappStoreUrl: 'https://dapps.trustwalletapp.com/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 5, 137, 80001]
  },
  opera: {
    id: 'opera',
    name: 'Opera',
    walletURL: 'https://www.opera.com/mobile/operabrowser',
    walletURLIos: 'https://www.opera.com/mobile/touch',
    dappStoreUrl: 'https://www.opera.com/dapps-store',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://operacrypto.page.link/?link=${encodeURIComponent(url)}&efr=1&apn=com.opera.browser`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://operacrypto.page.link/?link=${encodeURIComponent(url)}&efr=1&ibi=com.opera.OperaTouch&isi=1411869974`
      }
    },
    chains: [1, 5, 137, 80001]
  },
  coinbase_wallet: {
    id: 'coinbase_wallet',
    name: 'Coinbase Wallet',
    walletURL: 'https://www.toshi.org',
    dappStoreUrl: null,
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://go.cb-w.com/dapp?cb_url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 5, 137, 80001]
  },
  imtoken: {
    id: 'imtoken',
    name: 'imToken',
    walletURL: 'https://token.im/',
    dappStoreUrl: 'https://dapps.trustwalletapp.com/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) =>
          `imtokenv2://navigate/DappView?url=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) =>
          `imtokenv2://navigate/DappView?url=${encodeURIComponent(url)}`
      }
    },
    chains: [1, 5, 137, 80001]
  },
  zerion: {
    id: 'zerion',
    name: 'Zerion',
    walletURL: 'https://zerion.io/',
    dappStoreUrl: 'https://zerion.io/',
    mobile: {
      android: {
        support: false,
        deepLink: (url: string) => null
      },
      ios: {
        support: false,
        deepLink: (url: string) => null
      }
    },
    chains: [1, 5, 137, 80001]
  },
  rainbow: {
    id: 'rainbow',
    name: 'Rainbow',
    walletURL: 'https://rainbow.me/',
    dappStoreUrl: 'https://rainbow.me/',
    mobile: {
      android: {
        support: true,
        deepLink: (url: string) => `https://rnbwapp.com/wc?uri=${encodeURIComponent(url)}`
      },
      ios: {
        support: true,
        deepLink: (url: string) => `https://rnbwapp.com/wc?uri=${encodeURIComponent(url)}`
      }
    },
    chains: [1]
  },
  walletconnect: {
    id: 'walletconnect',
    name: 'WalletConnect',
    chains: [1, 5, 137, 80001],
    mobile: {
      android: {
        support: false
      },
      ios: {
        support: false,
      }
    },
  },
  manual_address: {
    id: 'manual_address',
    name: 'ENS or address',
    chains: [1, 5, 137, 80001],
    mobile: {
      android: {
        support: false
      },
      ios: {
        support: false,
      }
    },
  },
}

export default wallets
