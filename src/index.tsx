import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from './Themes/theme'
import { Footer } from './components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
      <Footer />
    </ThemeProvider>
  </React.StrictMode>
)
