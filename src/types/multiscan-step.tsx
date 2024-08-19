type TMultiscanStep =
                  // NO DATA FETCHED
                 'not_initialized' |

                  // DATA FETCHED AND NO WHITELIST ENABLED
                  // LINK WITH NO ADDRESS FETCH
                 'initial' |


                 'link_received' |

                  // DATA FETCHED AND WHITELIST ENABLED
                 'whitelist' |
                 'wallets_list' |
                 'download_await' |
                 'wallet_redirect_await' |
                 'set_address' |
                 'crossmint_connection' |
                 'ledger_connection' |
                 'sign_message' |
                 'eligible_to_claim'

export default TMultiscanStep