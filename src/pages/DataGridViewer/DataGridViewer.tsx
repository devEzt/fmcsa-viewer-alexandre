import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { format, parseISO } from 'date-fns'
import { DataRow } from './types'
import { fetchHeaders, fetchSheetData, fetchTotalRecords } from './utils'

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
  { field: 'dba_name', headerName: 'DBA Name', flex: 1.2 },
  { field: 'physical_address', headerName: 'Physical Address', flex: 1.6 },
  { field: 'phone', headerName: 'Phone', flex: 0.8 },
  { field: 'usdot_number', headerName: 'DOT', flex: 0.8 },
  { field: 'mc_mx_ff_number', headerName: 'MC/MX/FF', flex: 0.5 },
  { field: 'power_units', headerName: 'Power Units', flex: 0.5, align: 'center' },
  { field: 'out_of_service_date', headerName: 'Out of Service Date', flex: 0.8 },
]

export const DataGridViewer = ({ filters }: any) => {
  const [rows, setRows] = useState<DataRow[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [headers, setHeaders] = useState<string[]>([])
  const [filtered, setFiltered] = useState(false)

  useEffect(() => {
    fetchHeaders().then((headers) => {
      setHeaders(headers)
      fetchTotalRecords().then((total) => {
        setRowCount(total)
        fetchSheetData(page, pageSize, headers).then((data) => {
          setRows(data)
          setLoading(false)
        })
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (headers.length > 0) {
      setLoading(true)
      if (Object.keys(filters).length > 0) {
        fetchSheetData(0, 100000, headers, filters).then((data) => {
          setRows(data.slice(page * pageSize, (page + 1) * pageSize))
          setRowCount(data.length)
          setFiltered(true)
          setLoading(false)
        })
      } else {
        fetchSheetData(page, pageSize, headers).then((data) => {
          setRows(data)
          fetchTotalRecords().then((total) => {
            setRowCount(total)
          })
          setFiltered(false)
          setLoading(false)
        })
      }
    }
  }, [filters, headers, page, pageSize])

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
      loading={loading}
      rowCount={rowCount}
      pagination
      paginationMode={filtered ? 'client' : 'server'}
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={handlePaginationModelChange}
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
