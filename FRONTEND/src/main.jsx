import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Session from "../Context/SessionContext.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Session>
      <App />
    </Session>
  </BrowserRouter>
)
