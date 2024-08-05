import React from 'react'
import { Typography, Paper, Box, Grid, IconButton, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MenuBar } from '../../components'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { DataGridViewer } from '../DataGridViewer/DataGridViewer'

export const HomePage = () => {
  const theme = useTheme()

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Grid container direction="column">
        <Grid item>
          <MenuBar />
        </Grid>
        <Grid item>
          <Paper
            style={{
              padding: theme.spacing(2),
              margin: theme.spacing(2),
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ marginBottom: theme.spacing(2) }}
            >
              <Typography variant="h3" style={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
                Painel de Controle
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  aria-label="filter"
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.icon?.main,
                    },
                    borderRadius: '20%',
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography variant="h6" style={{ color: theme.palette.text.primary }}>
                    Filtros
                  </Typography>
                  <FilterAltIcon fontSize="medium" style={{ color: theme.palette.text.primary }} />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={{ width: '50%', bgcolor: 'text.primary', height: 2 }} />
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              padding: theme.spacing(2), // Aumentado para um padding maior
              margin: theme.spacing(2),
              backgroundColor: theme.palette.background.paper,
            }}
          >
            <DataGridViewer />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
