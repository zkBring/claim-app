import axios from 'axios'
const { REACT_APP_DASHBOARD_SERVER_URL } = process.env

const getCrossmintAddress = (
  chain_id: number,
  auth0_jwt: string
) => {
  return axios.post(`${REACT_APP_DASHBOARD_SERVER_URL}/api/v2/claim-links/auth/auth0`, {
    chain_id,
    auth0_jwt
  })
}

export default getCrossmintAddress
