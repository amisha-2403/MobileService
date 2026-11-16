import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const ModulePage = lazy(() => import('./pages/admin/ModulePage'))

export default function App() {
  return <Suspense fallback={<div className="app-loading">Loading workspace…</div>}><Routes><Route path="/admin" element={<AdminLayout />}><Route index element={<Navigate to="dashboard" replace />} /><Route path="dashboard" element={<DashboardPage />} /><Route path="products" element={<ModulePage />} /><Route path="inventory" element={<ModulePage />} /><Route path="orders" element={<ModulePage />} /><Route path="repairs" element={<ModulePage />} /><Route path="customers" element={<ModulePage />} /><Route path="used-phones" element={<ModulePage />} /><Route path="billing" element={<ModulePage />} /><Route path="reports" element={<ModulePage />} /><Route path="settings" element={<ModulePage />} /></Route><Route path="*" element={<Navigate to="/admin/dashboard" replace />} /></Routes></Suspense>
}
