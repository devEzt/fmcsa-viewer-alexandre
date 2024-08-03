import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    menu?: Palette['primary']
  }
  interface PaletteOptions {
    menu?: PaletteOptions['primary']
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: '#282828',
      paper: '#3c3c3c',
    },
    text: {
      primary: '#FFFFFF',
    },
    menu: {
      main: '#141414',
    },
  },
})

export default theme
