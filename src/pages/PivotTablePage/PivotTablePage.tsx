import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Checkbox,
  FormControlLabel,
  useTheme,
} from '@mui/material'
import PivotTableUI from 'react-pivottable/PivotTableUI'
import 'react-pivottable/pivottable.css'
import { MenuBar } from '../../components'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { DataRow } from '../DataGridViewer/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const headers = [
  { field: 'id', headerName: 'ID' },
  { field: 'created_dt', headerName: 'Created At' },
  { field: 'data_source_modified_dt', headerName: 'Modified Date' },
  { field: 'entity_type', headerName: 'Entity' },
  { field: 'operating_status', headerName: 'Operating Status' },
  { field: 'legal_name', headerName: 'Legal Name' },
  { field: 'dba_name', headerName: 'DBA Name' },
  { field: 'physical_address', headerName: 'Physical Address' },
  { field: 'phone', headerName: 'Phone' },
  { field: 'usdot_number', headerName: 'DOT' },
  { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF' },
  { field: 'power_units', headerName: 'Power Units' },
  { field: 'out_of_service_date', headerName: 'Out of Service Date' },
]

export const PivotTablePage = () => {
  const [data, setData] = useState<any[]>([])
  const [selectedFields, setSelectedFields] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('table')
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 5
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

  const handleToggleView = () => {
    setView(view === 'table' ? 'chart' : 'table')
  }

  const handleFieldChange = (field: any) => {
    const newFields = new Set(selectedFields)
    if (newFields.has(field)) {
      newFields.delete(field)
    } else {
      newFields.add(field)
    }
    setSelectedFields(newFields)
  }

  const chartData = {
    labels: data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((row) => row.legal_name),
    datasets: Array.from(selectedFields).map((field) => ({
      label: headers.find((h) => h.field === field)?.headerName,
      data: data
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((row) => parseInt(row[field as keyof DataRow], 10)),
      backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
    })),
  }

  const handleDataChange = (newData: any) => {
    if (newData && newData.data) {
      setData(newData.data)
    }
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
        },
      },
      x: {
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  }

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
            }}
          >
            <Typography variant="h3" style={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
              FMCSA Table Pivot
            </Typography>
            {view !== 'table' && (
              <>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {headers.map((header) => (
                    <FormControlLabel
                      key={header.field}
                      control={
                        <Checkbox
                          checked={selectedFields.has(header.field)}
                          onChange={() => handleFieldChange(header.field)}
                        />
                      }
                      label={header.headerName}
                    />
                  ))}
                </div>
              </>
            )}
            <Button
              onClick={handleToggleView}
              style={{ margin: theme.spacing(1) }}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: '#ffffff',
                marginRight: theme.spacing(2),
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#030303',
                },
                padding: theme.spacing(1.5),
                fontSize: '1rem',
              }}
            >
              Switch to {view === 'table' ? 'Chart' : 'Table'}
            </Button>
            {view === 'chart' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: theme.spacing(2) }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: '#ffffff',
                      marginRight: theme.spacing(2),
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#030303',
                      },
                      padding: theme.spacing(1.5),
                      fontSize: '1rem',

                      '&.Mui-disabled': {
                        backgroundColor: 'gray',
                        color: '#ffffff',
                      },
                    }}
                  >
                    Previous Page
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={(currentPage + 1) * itemsPerPage >= data.length}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: '#ffffff',
                      marginRight: theme.spacing(2),
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#030303',
                      },
                      padding: theme.spacing(1.5),
                      fontSize: '1rem',
                    }}
                  >
                    Next Page
                  </Button>
                </div>
              </>
            )}
            <Divider sx={{ width: '100%', bgcolor: 'text.primary', height: 2, my: 2 }} />
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            ) : view === 'table' ? (
              <PivotTableUI data={data} onChange={handleDataChange} />
            ) : (
              <Bar data={chartData} options={options} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
