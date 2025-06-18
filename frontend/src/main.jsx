import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PinContext } from './context/PinContext.jsx'
import {UserContext} from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PinContext>
      <UserContext>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </UserContext>
    </PinContext>
  </StrictMode>,
)
