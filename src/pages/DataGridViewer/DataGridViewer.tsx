import axios from 'axios'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { format, parseISO } from 'date-fns'
import { DataRow } from './types'

const fetchSheetData = async (page: number, pageSize: number, headers: string[]) => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  const startRow = page * pageSize + 2
  const endRow = startRow + pageSize
  const range = `FMSCA_records (2)!A${startRow}:AE${endRow}`
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  try {
    const response = await axios.get(url)

    if (!response.data.values || response.data.values.length === 0) {
      return []
    }

    const rows = response.data.values.map((row: string[], index: number): DataRow => {
      const obj: any = {}
      row.forEach((cell, cellIndex) => {
        const key = headers[cellIndex] as keyof DataRow
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

const fetchTotalRecords = async () => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  const range = 'FMSCA_records (2)!A1:A'
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  console.log(`Fetching total records from range: ${range}`)

  try {
    const response = await axios.get(url)
    console.log(`Total records response: `, response.data)
    return response.data.values.length - 1
  } catch (error) {
    console.error('Failed to fetch total records:', error)
    return 0
  }
}

const fetchHeaders = async () => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  const range = 'FMSCA_records (2)!A1:AE1'
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  console.log(`Fetching headers from range: ${range}`)

  try {
    const response = await axios.get(url)
    return response.data.values[0]
  } catch (error) {
    console.error('Failed to fetch headers:', error)
    return []
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', flex: 0.5 },
  {
    field: 'created_dt',
    headerName: 'Created At',
    flex: 0.8,
    valueFormatter: (value) => format(parseISO(value), 'MM/dd/yyyy'),
  },
  {
    field: 'data_source_modified_dt',
    headerName: 'Modified Date',
    flex: 0.8,
    valueFormatter: (value) => format(parseISO(value), 'MM/dd/yyyy'),
  },
  { field: 'entity_type', headerName: 'Entity', flex: 0.8 },
  { field: 'operating_status', headerName: 'Operating Status', flex: 0.8 },
  { field: 'legal_name', headerName: 'Legal Name', flex: 1.5 },
  { field: 'dba_name', headerName: 'DBA Name', flex: 1 },
  { field: 'physical_address', headerName: 'Physical Address', flex: 1.5 },
  { field: 'phone', headerName: 'Phone', flex: 1 },
  { field: 'usdot_number', headerName: 'DOT', flex: 0.8 },
  { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF', flex: 0.5 },
  { field: 'power_units', headerName: 'Power Units', flex: 0.5 },
  { field: 'out_of_service_date', headerName: 'Out of Service Date', flex: 0.8 },
]

export const DataGridViewer = () => {
  const [rows, setRows] = useState<DataRow[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [headers, setHeaders] = useState<string[]>([])

  useEffect(() => {
    fetchHeaders().then((headers) => {
      setHeaders(headers)
      fetchTotalRecords().then((total) => {
        setRowCount(total)
      })
    })
  }, [])

  useEffect(() => {
    if (headers.length > 0) {
      setLoading(true)
      fetchSheetData(page, pageSize, headers).then((data) => {
        setRows(data)
        setLoading(false)
      })
    }
  }, [page, pageSize, headers])

  const handlePaginationModelChange = (newModel: { page: number; pageSize: number }) => {
    if (newModel.page !== page) {
      setPage(newModel.page)
    }
    if (newModel.pageSize !== pageSize) {
      setPageSize(newModel.pageSize)
    }
  }

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      pagination
      paginationMode="server"
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={handlePaginationModelChange}
      loading={loading}
      autoHeight
      getRowId={(row) => row.id}
      pageSizeOptions={[5, 10, 20, 50, 100]}
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
