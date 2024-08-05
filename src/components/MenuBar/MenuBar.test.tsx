import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import MenuBar from './MenuBar'

describe('MenuBar Component', () => {
  it('renders correctly with the provided theme', () => {
    const theme = createTheme({
      palette: {
        menu: { main: '#000' },
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MenuBar />
        </BrowserRouter>
      </ThemeProvider>
    )

    const menuButton = screen.getByLabelText(/menu/i)
    const logoImage = screen.getByAltText(/FMCSA Logo/i)

    expect(menuButton).toBeInTheDocument()
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('src', '/fmcsa-logo.png')
  })

  it('opens and closes the drawer when menu button is clicked', () => {
    const theme = createTheme({
      palette: {
        menu: { main: '#000' },
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MenuBar />
        </BrowserRouter>
      </ThemeProvider>
    )

    const menuButton = screen.getByLabelText(/menu/i)
    fireEvent.click(menuButton)

    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Contact/i)).toBeInTheDocument()
  })
})
