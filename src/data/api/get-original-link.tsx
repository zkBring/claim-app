import axios from 'axios'
const { REACT_APP_QR_SERVER_URL } = process.env

const getOriginalLink = (linkId: string) => {
  return axios(`${REACT_APP_QR_SERVER_URL}/user/claim-params/${linkId}`)
}

export default getOriginalLink
