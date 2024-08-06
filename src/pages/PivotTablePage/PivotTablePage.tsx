import { Box, Grid, Paper, Typography, useTheme, CircularProgress, Divider } from '@mui/material'
import React, { useState, useEffect } from 'react'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import { MenuBar } from '../../components'

export const PivotTablePage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const theme = useTheme()

  useEffect(() => {
    fetch('/FMSCA_records.csv')
      .then((response) => response.text())
      .then((csv) => {
        const Papa = require('papaparse')
        const parsedData = Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        }).data

        setData(parsedData)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error searching data:', error)
        setLoading(false)
      })
  }, [])

  return (
    <Box style={{ minHeight: '95vh' }}>
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
              position: 'relative',
            }}
          >
            <Typography variant="h3" style={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
              FMCSA Table Pivot
            </Typography>
            <Divider sx={{ width: '35%', bgcolor: 'text.primary', height: 2 }} />

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ marginTop: 4 }}>
                <PivotTableUI data={data} onChange={(s: any) => setData(s)} {...data} />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
