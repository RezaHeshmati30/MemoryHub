import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { StudySetsContextProvider } from './context/StudySetsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StudySetsContextProvider>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </StudySetsContextProvider>
  </React.StrictMode>,
)
