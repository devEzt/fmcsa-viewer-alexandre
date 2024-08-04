import React from 'react'
import { Typography, Paper, Box, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MenuBar } from '../../components'

export const HomePage = () => {
  const theme = useTheme()

  return (
    <Box style={{ height: '100vh', backgroundColor: theme.palette.background.default }}>
      <Grid container direction="column">
        <Grid item>
          <MenuBar />
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              padding: theme.spacing(2),
              margin: theme.spacing(2),
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
              Bem-vindo à HomePage!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
