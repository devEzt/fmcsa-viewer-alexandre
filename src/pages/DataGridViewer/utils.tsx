import axios from 'axios'
import { DataRow } from './types'

export const fetchSheetData = async (page: number, pageSize: number, headers: string[], filters: any = {}) => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  let range = `FMSCA_records (2)!A${page * pageSize + 2}:AE${page * pageSize + pageSize + 2}`
  if (Object.keys(filters).length > 0) {
    range = `FMSCA_records (2)!A2:AE100000`
  }
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  try {
    const response = await axios.get(url)

    if (!response.data.values || response.data.values.length === 0) {
      return []
    }

    const rows = response.data.values.map((row: string[]): DataRow => {
      const obj: any = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ''
      })
      return obj
    })

    if (Object.keys(filters).length > 0) {
      const filteredRows = rows.filter((row: any) => {
        return Object.keys(filters).every((key) => {
          console.log(`Filtering by ${key}: ${filters[key]}, Row value: ${row[key]}`)
          return !filters[key] || row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
        })
      })
      return filteredRows
    }

    return rows
  } catch (error) {
    return []
  }
}

export const fetchTotalRecords = async () => {
  const spreadsheetId = '1hB_LjBT9ezZigXnC-MblT2PXZledkZqBnvV23ssfSuE'
  const range = 'FMSCA_records (2)!A1:A'
  const apiKey = 'AIzaSyBzbSdjViTGRxXk0z12ivoKf7Wk-mloL_8'
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`

  try {
    const response = await axios.get(url)
    return response.data.values.length - 1
  } catch (error) {
    return 0
  }
}

export const fetchHeaders = async () => {
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
