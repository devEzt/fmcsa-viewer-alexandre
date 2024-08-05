import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import { Link as RouterLink } from 'react-router-dom'

export const MenuBar = () => {
  const theme = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button component={RouterLink} to="/" selected={true}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.menu?.main }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" size="large" onClick={toggleDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src="/fmcsa-logo.png" alt="FMCSA Logo" style={{ height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
