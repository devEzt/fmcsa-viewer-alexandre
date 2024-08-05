import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Footer from './Footer'

describe('Footer Component', () => {
  it('renders correctly with the provided theme', () => {
    const theme = createTheme({
      spacing: (factor: number) => `${factor * 8}px`,
      palette: {
        menu: { main: '#000' },
        divider: '#333',
      },
    })

    render(
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    )

    const footerElement = screen.getByText(/© 2024 Copyright FMCSA. All rights reserved./i)
    const termsLink = screen.getByRole('link', { name: /Terms of service/i })
    const devLink = screen.getByRole('link', { name: /DevEzt/i })

    expect(footerElement).toBeInTheDocument()
    expect(termsLink).toBeInTheDocument()
    expect(devLink).toBeInTheDocument()

    // eslint-disable-next-line testing-library/no-node-access
    const boxElement = footerElement.closest('div')
    expect(boxElement).toHaveStyle(`padding: ${theme.spacing(3)}`)
    expect(boxElement).toHaveStyle(`background-color: ${theme.palette.menu?.main}`)
    expect(boxElement).toHaveStyle(`border-top: 1px solid ${theme.palette.divider}`)
  })
})
