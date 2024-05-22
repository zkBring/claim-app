import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/application'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
import { datadogRum } from '@datadog/browser-rum'
import { datadogLogs } from '@datadog/browser-logs'

const {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_DATADOG_CLIENT_TOKEN,
  REACT_APP_DATADOG_APPLICATION_ID
} = process.env

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN as string}
      clientId={REACT_APP_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (REACT_APP_DATADOG_CLIENT_TOKEN && REACT_APP_DATADOG_APPLICATION_ID) {
  datadogRum.init({
    applicationId: REACT_APP_DATADOG_APPLICATION_ID as string,
    clientToken: REACT_APP_DATADOG_CLIENT_TOKEN as string,
    // `site` refers to the Datadog site parameter of your organization
    // see https://docs.datadoghq.com/getting_started/site/
    site: 'us3.datadoghq.com',
    service: 'linkdrop-claim-app',
    env: '<ENV_NAME>',
    // Specify a version number to identify the deployed version of your application in Datadog
    // version: '1.0.0', 
    sessionSampleRate: 100,
    sessionReplaySampleRate: 20,
    trackUserInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input',
    trackSessionAcrossSubdomains: true
  })

  datadogLogs.init({
    clientToken: REACT_APP_DATADOG_CLIENT_TOKEN as string,
    site: 'us3.datadoghq.com',
    forwardErrorsToLogs: true,
    sessionSampleRate: 100,
    trackSessionAcrossSubdomains: true
  })
}
