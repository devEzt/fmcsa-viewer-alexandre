import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button'
import theme from './Themes/theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Clique Aqui
      </Button>
    </ThemeProvider>
  )
}

export default App
