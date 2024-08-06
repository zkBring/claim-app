import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getMultiQRData = (
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  msg?: string,
  chainId?: number,
  receiver?: string,
  whitelistSig?: string,
  nonce?: string,
  timestamp?: number
) => {
  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/pop/multiscan-qrs/${multiscanQRId}`, {
    scan_id: scanId,
    scan_id_sig: scanIdSig,
    receiver,
    message: msg,
    chain_id: chainId ? String(chainId) : undefined,
    whitelist_sig: whitelistSig,
    nonce,
    timestamp
  })
}

export default getMultiQRData
