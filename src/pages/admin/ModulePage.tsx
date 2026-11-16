import { useLocation, Link } from 'react-router-dom'
import { ArrowRight, Boxes, ChartNoAxesCombined, CircleCheck, FileText, Plus, Search, Settings, ShoppingBag, Smartphone, Users, Wrench, Repeat2, ReceiptText } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'

const modules: Record<string, { title: string; description: string; icon: typeof Smartphone; action: string; points: string[] }> = {
  products: { title: 'Products', description: 'Manage your mobile phones, accessories and product catalogue.', icon: Smartphone, action: 'Add product', points: ['Product catalogue', 'Categories & pricing', 'Product variants'] },
  inventory: { title: 'Inventory', description: 'Monitor stock levels across your shop and stay ready to restock.', icon: Boxes, action: 'Update stock', points: ['Current stock levels', 'Low stock alerts', 'Stock movement history'] },
  orders: { title: 'Orders', description: 'Review customer purchases and manage fulfilment from one place.', icon: ShoppingBag, action: 'Create order', points: ['Order processing', 'Payment tracking', 'Fulfilment status'] },
  repairs: { title: 'Repairs', description: 'Track repair jobs from the first customer request to pickup.', icon: Wrench, action: 'New repair job', points: ['Repair job queue', 'Service status updates', 'Pickup scheduling'] },
  customers: { title: 'Customers', description: 'Keep customer details and purchase history organised.', icon: Users, action: 'Add customer', points: ['Customer directory', 'Purchase history', 'Contact information'] },
  'used-phones': { title: 'Used Phones', description: 'Manage pre-owned devices, trade-ins and device condition.', icon: Repeat2, action: 'Add used phone', points: ['Used device listings', 'Trade-in assessment', 'Condition and pricing'] },
  billing: { title: 'Sales & Billing', description: 'Create shop invoices and keep daily sales records in order.', icon: ReceiptText, action: 'Create invoice', points: ['New bill and invoice', 'Payment records', 'Sales register'] },
  reports: { title: 'Reports', description: 'Review sales, inventory and service performance for your shop.', icon: ChartNoAxesCombined, action: 'Export report', points: ['Sales summaries', 'Inventory valuation', 'Repair performance'] },
  settings: { title: 'Settings', description: 'Configure your shop details and dashboard preferences.', icon: Settings, action: 'Save changes', points: ['Shop information', 'Receipt preferences', 'Notification settings'] },
}
export default function ModulePage() {
  const key = useLocation().pathname.split('/').filter(Boolean).at(-1) ?? 'products'; const module = modules[key] ?? modules.products; const Icon = module.icon
  return <><PageHeader title={module.title} description={module.description} action={<button className="primary-button" onClick={() => window.alert(`${module.action} will be available when this module is implemented.`)}><Plus size={16} />{module.action}</button>} /><div className="placeholder-card"><span className="placeholder-icon"><Icon size={24} /></span><h2>{module.title} workspace</h2><p>This section is ready for the next implementation phase. Your shop data and workflows will appear here once this module is connected.</p><div className="placeholder-list">{module.points.map(point => <div key={point}><CircleCheck size={16} />{point}</div>)}</div><div className="placeholder-search"><Search size={17} /><span>Search {module.title.toLowerCase()}...</span></div><div className="placeholder-note"><FileText size={16} /> Demo workspace · Sample data will be connected in a future phase</div></div><div className="module-next"><div><strong>Continue exploring</strong><span>Jump to another shop workspace</span></div><Link to="/admin/dashboard">Dashboard <ArrowRight size={15} /></Link></div></>
}
