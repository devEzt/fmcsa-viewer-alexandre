import axios from 'axios'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface DataRow {
  id: string
  created_at: string
  modified_dt: string
  entity_type: string
  operating_status: string
  legal_name: string
  dba_name: string
  physical_address: string
  phone: string
  usdot_number: string
  mc_mx_ff_number: string
  power_units: string
  out_of_service_date: string
}

const fetchSheetData = async () => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  const range = 'FMSCA_records (2)'
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  try {
    const response = await axios.get(url)
    const headers = response.data.values[0]
    const rows = response.data.values.slice(1).map((row: string[]): DataRow => {
      const obj: any = {}
      row.forEach((cell, index) => {
        const key = headers[index] as keyof DataRow
        obj[key] = cell
      })
      return obj
    })
    return rows
  } catch (error) {
    console.error('Failed to fetch data:', error)
    return []
  }
}

export const DataGridViewer = () => {
  const [rows, setRows] = useState<DataRow[]>([])

  useEffect(() => {
    fetchSheetData().then((data) => {
      setRows(data)
    })
  }, [])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'created_dt', headerName: 'Created At', width: 150 },
    { field: 'data_source_modified_dt', headerName: 'Modified Date', width: 150 },
    { field: 'entity_type', headerName: 'Entity', width: 150 },
    { field: 'operating_status', headerName: 'Operating Status', width: 150 },
    { field: 'legal_name', headerName: 'Legal Name', width: 150 },
    { field: 'dba_name', headerName: 'DBA Name', width: 150 },
    { field: 'physical_address', headerName: 'Physical Address', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'usdot_number', headerName: 'DOT', width: 150 },
    { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF', width: 150 },
    { field: 'power_units', headerName: 'Power Units', width: 150 },
    { field: 'out_of_service_date', headerName: 'Out of Service Date', width: 150 },
  ]

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 20, 50, 100]}
      autoHeight
      sx={{
        '& .MuiDataGrid-root': {
          backgroundColor: '#ffffff',
        },
        '& .MuiSvgIcon-root': {
          fill: '#c0c0c0',
        },
      }}
    />
  )
}
