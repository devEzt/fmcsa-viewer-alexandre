// src/Routes.tsx
import React from 'react'
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom'
import { HomePage, PivotTablePage } from './pages'

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pivotTable" element={<PivotTablePage />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes
