import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CheckCircle2, X, XCircle } from 'lucide-react'
import AdminLayout from './components/layout/AdminLayout'
import { ProductStoreProvider } from './state/ProductStore'
import { useProductStore } from './state/ProductStore'
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'))
const ModulePage = lazy(() => import('./pages/admin/ModulePage'))
const ProductsPage = lazy(() => import('./pages/admin/ProductsPage'))
const InventoryPage = lazy(() => import('./pages/admin/InventoryPage'))

export default function App() {
  return (
    <ProductStoreProvider>
      <ToastViewport />
      <Suspense fallback={<div className="page-loading">Loading workspace…</div>}>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="orders" element={<ModulePage />} />
            <Route path="repairs" element={<ModulePage />} />
            <Route path="customers" element={<ModulePage />} />
            <Route path="used-phones" element={<ModulePage />} />
            <Route path="billing" element={<ModulePage />} />
            <Route path="reports" element={<ModulePage />} />
            <Route path="settings" element={<ModulePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </ProductStoreProvider>
  )
}

function ToastViewport() {
  const { toasts, dismissToast } = useProductStore()
  return (
    <div className="toast-viewport" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.kind}`}>
          <span>{toast.kind === 'success' ? <CheckCircle2 size={17} /> : <XCircle size={17} />}</span>
          <p>{toast.message}</p>
          <button aria-label="Dismiss notification" onClick={() => dismissToast(toast.id)}><X size={15} /></button>
        </div>
      ))}
    </div>
  )
}
