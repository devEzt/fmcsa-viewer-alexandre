import React, { useState } from 'react'
import { Grid, Button, TextField, Paper, CircularProgress, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import InfoIcon from '@mui/icons-material/Info'

const FilterPanel = ({ onSearch }: any) => {
  const [filterData, setFilterData] = useState({
    id: '',
    entity_type: '',
    operating_status: '',
    legal_name: '',
    dba_name: '',
    physical_address: '',
    phone: '',
    usdot_number: '',
    power_units: '',
    mc_mx_ff_number: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData({
      ...filterData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSearch = () => {
    setLoading(true)
    onSearch(filterData)
    setLoading(false)
  }

  const handleClear = () => {
    setFilterData({
      id: '',
      entity_type: '',
      operating_status: '',
      legal_name: '',
      dba_name: '',
      physical_address: '',
      phone: '',
      usdot_number: '',
      power_units: '',
      mc_mx_ff_number: '',
    })
    onSearch({})
  }

  const theme = useTheme()

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
    '& .MuiInputLabel-root': {
      color: '#ffffff',
    },
    '&:hover .MuiInputLabel-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: theme.palette.primary.main,
    },
  }

  return (
    <Paper
      style={{
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField label="ID" name="id" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Entity" name="entity_type" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Operating Status"
            name="operating_status"
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Legal Name" name="legal_name" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="DBA Name" name="dba_name" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Physical Address"
            name="physical_address"
            onChange={handleChange}
            fullWidth
            sx={textFieldStyle}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Phone" name="phone" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="DOT" name="usdot_number" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="Power Units" name="power_units" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={4}>
          <TextField label="MC/MX/FF" name="mc_mx_ff_number" onChange={handleChange} fullWidth sx={textFieldStyle} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" alignItems="center">
          <Tooltip title="The search may take some time due to the large volume of data.">
            <InfoIcon
              fontSize="large"
              sx={{ marginRight: theme.spacing(2), cursor: 'pointer', color: theme.palette.primary.main }}
            />
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClear}
            startIcon={<ClearIcon />}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: '#ffffff',
              marginRight: theme.spacing(2),
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
                color: '#ffffff',
              },
              padding: theme.spacing(1.5),
              fontSize: '1rem',
            }}
          >
            Limpar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={24} /> : <SearchIcon />}
            sx={{
              backgroundColor: '#ffffff',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: '#ffffff',
              },
              padding: theme.spacing(1.5),
              fontSize: '1rem',
            }}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default FilterPanel
