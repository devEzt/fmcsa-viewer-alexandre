import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import FilterPanel from './FilterPanel'

describe('FilterPanel Component', () => {
  const mockOnSearch = jest.fn()

  const renderComponent = () => {
    const theme = createTheme({
      palette: {
        primary: { main: '#000' },
        background: { paper: '#fff' },
      },
      spacing: 4,
    })

    render(
      <ThemeProvider theme={theme}>
        <FilterPanel onSearch={mockOnSearch} />
      </ThemeProvider>
    )
  }

  beforeEach(() => {
    mockOnSearch.mockClear()
  })

  it('renders correctly', () => {
    renderComponent()

    expect(screen.getByLabelText(/ID/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Entity/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Operating Status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Legal Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/DBA Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Physical Address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/DOT/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Power Units/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/MC\/MX\/FF/i)).toBeInTheDocument()
    expect(screen.getByText(/Reset/i)).toBeInTheDocument()
    expect(screen.getByText(/Search/i)).toBeInTheDocument()
  })
})
