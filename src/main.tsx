import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const clientID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientID}>
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
