import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getQRData = (qrId: string) => {
  return axios(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v1/user/QR/${qrId}`)
}

export default getQRData
