import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getOriginalLink = (linkId: string) => {
  return axios(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v1/user/claim-params/${linkId}`)
}

export default getOriginalLink
