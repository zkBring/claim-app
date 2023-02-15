import axios from 'axios'
const { REACT_APP_QR_SERVER_URL } = process.env

const getQRData = (qrId: string) => {
  return axios(`${REACT_APP_QR_SERVER_URL}/user/QR/${qrId}`)
}

export default getQRData
