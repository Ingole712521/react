import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-vjodbpirxpntl7em.us.auth0.com"
    clientId="l1zXjkk3duvWnnFrR1BAxH3KT7PE7PmZ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >




    <App />
  </Auth0Provider>

)
