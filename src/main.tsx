import '@/index.css'
import LanguageProvider from '@/providers/LanguageProvider'
import ThemeProvider from '@/providers/ThemeProvider'
import App from '@/setup/App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider />
      <ThemeProvider />
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
