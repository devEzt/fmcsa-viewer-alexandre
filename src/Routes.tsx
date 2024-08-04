// src/Routes.tsx
import React from 'react'
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom'
import { HomePage } from './pages'

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<HomePage />} />
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default Routes
