import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LangProvider } from './i18n.jsx'
import { ProgressProvider } from './progress.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </LangProvider>
  </React.StrictMode>
)
