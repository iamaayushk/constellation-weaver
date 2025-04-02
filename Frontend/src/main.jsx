import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { counterProvider } from './Components/counterContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <counterProvider>
    <App />
  </counterProvider>
  </StrictMode>,
)
