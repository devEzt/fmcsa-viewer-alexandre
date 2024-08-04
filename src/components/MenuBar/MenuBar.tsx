import React from 'react'
import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'

const logo = '/fmcsa-logo.png'

export const MenuBar = () => {
  const theme = useTheme()

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.menu?.main }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" size="large">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={logo} alt="FMCSA Logo" style={{ height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
