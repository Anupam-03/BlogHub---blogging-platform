import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BlogProvider } from './context/BlogContext'

import { ThemeProvider } from "@material-tailwind/react";


ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <AuthProvider>
      <React.StrictMode>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </React.StrictMode>,
    </AuthProvider>
  )
