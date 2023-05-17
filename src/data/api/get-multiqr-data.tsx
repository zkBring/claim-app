import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getMultiQRData = (
  dispenserId: string,
  multiscanQRId: string,
  scanId: string,
  scanIdSig: string,
  receiver: string
) => {
  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/user/multiscan-qrs/${dispenserId}/pop`, {
    multiscanQRId,
    scanId,
    scanIdSig,
    receiver
  })
}

export default getMultiQRData
