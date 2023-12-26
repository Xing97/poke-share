import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './services/i18n'

const root = document.getElementById('root') ?? document.body

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
