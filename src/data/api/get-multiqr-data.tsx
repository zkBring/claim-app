import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getMultiQRData = (
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  receiver: string,
  whitelistSig?: string
) => {
  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/dashboard/dispensers/pop/multiscan-qrs/${multiscanQRId}`, {
    scan_id: scanId,
    scan_id_sig: scanIdSig,
    receiver,
    whitelist_sig: whitelistSig
  })
}

export default getMultiQRData
