import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    menu?: Palette['primary']
    icon?: Palette['primary']
  }
  interface PaletteOptions {
    menu?: PaletteOptions['primary']
    icon?: PaletteOptions['primary']
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#1E2122',
      paper: '#2D3133',
    },
    text: {
      primary: '#FFFFFF',
    },
    menu: {
      main: '#0F1011',
    },
    icon: {
      main: '#282828',
    },
  },
})

export default theme
