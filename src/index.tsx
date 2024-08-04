import React from 'react'
import ReactDOM from 'react-dom/client'
import Routes from './Routes' // Importando o componente de Rotas
import { ThemeProvider } from '@mui/material/styles'
import theme from './Themes/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
)
