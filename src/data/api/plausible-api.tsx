import axios, { AxiosResponse } from 'axios'
const { REACT_APP_PLAUSIBLE_DOMAIN } = process.env

type TEventData = {
  eventName: string
  data?: {
    [dataTitle: string]: string
  }
}

type TInvokeEvent = (eventData: TEventData) => Promise<void | AxiosResponse>

const invokeEvent: TInvokeEvent = async ({
  eventName, data
}) => {
  if (!REACT_APP_PLAUSIBLE_DOMAIN) { return }
  try {
    return axios.post('https://plausible.io/api/event', {
      name: eventName,
      url: window.location.href,
      domain: window.location.host,
      props: data
    }, {
      headers: {
        // 'X-Forwarded-For': '127.0.0.1',
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.error(err)
  }
}


export default {
  invokeEvent
}