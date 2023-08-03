import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/application'
import reportWebVitals from './reportWebVitals'
import { Auth0Provider } from '@auth0/auth0-react'
const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env

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
