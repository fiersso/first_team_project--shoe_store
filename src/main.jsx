import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './css/index.css'

import AuthProvider from './providers/AuthProvider'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </AuthProvider>,
)
