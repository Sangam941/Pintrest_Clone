import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PinContext } from './context/PinContext.jsx'
import { UserContext } from './context/UserContext.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <PinContext>

        <BrowserRouter>
          <Toaster />
          <App />
        </BrowserRouter>

      </PinContext>
    </UserContext>
  </StrictMode>,
)
