import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false); const [mobileOpen, setMobileOpen] = useState(false)
  return <div className="admin-shell"><Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className={`content-shell ${collapsed ? 'content-expanded' : ''}`}><TopNavbar setMobileOpen={setMobileOpen} /><main className="main-content"><Outlet /></main></div></div>
}
