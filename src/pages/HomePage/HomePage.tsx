import React, { useState } from 'react'
import { Typography, Paper, Box, Grid, IconButton, Divider, Collapse } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MenuBar } from '../../components'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { DataGridViewer } from '../DataGridViewer/DataGridViewer'
import FilterPanel from '../DataGridViewer/FilterDataGridViewer/FilterPanel'

export const HomePage = () => {
  const theme = useTheme()
  const [filterVisible, setFilterVisible] = useState(false)
  const [filters, setFilters] = useState({})

  const handleFilterClick = () => {
    setFilterVisible(!filterVisible)
  }

  const handleSearch = (filterData: any) => {
    setFilters(filterData)
  }

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
                FMCSA Table Viewer
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  aria-label="filter"
                  onClick={handleFilterClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.icon?.main,
                    },
                    borderRadius: '20%',
                    padding: theme.spacing(2),
                  }}
                >
                  <Typography variant="h6" style={{ color: theme.palette.text.primary }}>
                    Filters
                  </Typography>
                  <FilterAltIcon fontSize="medium" style={{ color: theme.palette.text.primary }} />
                </IconButton>
              </Box>
            </Box>
            <Divider sx={{ width: '50%', bgcolor: 'text.primary', height: 2 }} />
            <Collapse in={filterVisible}>
              <FilterPanel onSearch={handleSearch} />
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper
            style={{
              padding: theme.spacing(2),
              margin: theme.spacing(2),
              backgroundColor: theme.palette.background.paper,
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h6"
              style={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '16px' }}
            >
              The Federal Motor Carrier Safety Administration is an agency within the United States Department of
              Transportation that regulates the trucking industry in the United States. This table shows various
              parameters for a trucking company such as MC, DOT, Carrier/Broker/Shipper, Inspections and others.
            </Typography>
            <DataGridViewer filters={filters} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
