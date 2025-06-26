import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '@/stores/useStore'

const ProtectedRoute = () => {
  const token = useStore((state) => state.token)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
