import applicationOptions from 'configs/application'
const { REACT_APP_CLIENT } = process.env 


const defineApplicationConfig = () => {
  return applicationOptions[REACT_APP_CLIENT || 'zkbring']
}

export default defineApplicationConfig