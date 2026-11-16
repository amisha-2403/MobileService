import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Smartphone, Boxes, ShoppingBag, Wrench, Users, Repeat2, ReceiptText, ChartNoAxesCombined, Settings, ChevronLeft, Headphones, Plus, CircleHelp, PanelLeftClose, X } from 'lucide-react'

const mainLinks = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/admin/products', icon: Smartphone }, { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
  { label: 'Orders', path: '/admin/orders', icon: ShoppingBag, count: '8' }, { label: 'Repairs', path: '/admin/repairs', icon: Wrench, count: '3' },
  { label: 'Customers', path: '/admin/customers', icon: Users }, { label: 'Used Phones', path: '/admin/used-phones', icon: Repeat2 },
  { label: 'Sales & Billing', path: '/admin/billing', icon: ReceiptText }, { label: 'Reports', path: '/admin/reports', icon: ChartNoAxesCombined },
]

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: { collapsed: boolean; setCollapsed: (value: boolean) => void; mobileOpen: boolean; setMobileOpen: (value: boolean) => void }) {
  const [helpOpen, setHelpOpen] = useState(false)
  return <>
    {mobileOpen && <button aria-label="Close navigation" className="sidebar-scrim" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="brand-row"><div className="brand-mark"><Smartphone size={19} strokeWidth={2.5} /></div><div className="brand-copy"><strong>smart<span>cell</span></strong><small>SHOP MANAGER</small></div><button className="icon-btn sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close sidebar"><X size={19} /></button><button className="icon-btn collapse-btn" onClick={() => setCollapsed(!collapsed)} aria-label="Collapse sidebar"><PanelLeftClose size={18} /></button></div>
      <button className="shop-switch"><div className="shop-avatar">S</div><div className="shop-copy"><strong>SmartCell Mobiles</strong><small>Indiranagar, Bengaluru</small></div><ChevronLeft size={16} className="switch-arrow" /></button>
      <div className="nav-label">WORKSPACE</div>
      <nav className="nav-list">{mainLinks.map(({ label, path, icon: Icon, count }) => <NavLink key={path} to={path} onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`} title={collapsed ? label : undefined}><Icon size={18} strokeWidth={1.8} /><span>{label}</span>{count && <i>{count}</i>}</NavLink>)}</nav>
      <div className="sidebar-bottom"><NavLink to="/admin/settings" onClick={() => setMobileOpen(false)} className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}><Settings size={18} strokeWidth={1.8} /><span>Settings</span></NavLink><div className="sidebar-help"><div className="help-icon"><Headphones size={17} /></div><div className="help-copy"><strong>Need a hand?</strong><small>We're here to help</small></div><button className="help-plus" onClick={() => setHelpOpen(!helpOpen)} aria-label="Show help options"><Plus size={15} /></button></div>{helpOpen && <div className="help-popover"><strong>Shop support</strong><span>Call us at +91 80 4567 8900</span><span>support@smartcell.in</span></div>}<div className="sidebar-footnote"><CircleHelp size={14} /> Help centre <span>v1.0.0</span></div></div>
    </aside>
  </>
}
