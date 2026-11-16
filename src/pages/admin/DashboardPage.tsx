import { useState } from 'react'
import { Activity, ArrowDownToLine, ClipboardList, IndianRupee, Package, Wrench } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader'
import StatCard from '../../components/dashboard/StatCard'
import SalesChart from '../../components/dashboard/SalesChart'
import RecentOrdersTable from '../../components/dashboard/RecentOrdersTable'
import RepairStatusCard from '../../components/dashboard/RepairStatusCard'
import LowStockAlert from '../../components/dashboard/LowStockAlert'
export default function DashboardPage() {
  const [exported, setExported] = useState(false)
  return <><PageHeader title="Good morning, Arjun" description="Here’s what’s happening at your shop today." action={<button className={`primary-button ${exported ? 'button-success' : ''}`} onClick={() => { setExported(true); window.setTimeout(() => setExported(false), 1800) }}><ArrowDownToLine size={16} />{exported ? 'Report ready' : 'Export report'}</button>} /><div className="stats-grid"><StatCard label="Total sales today" value="₹1,24,580" icon={IndianRupee} delta="18.2%" note="vs. yesterday" color="blue" /><StatCard label="Total orders" value="24" icon={ClipboardList} delta="8.4%" note="vs. yesterday" color="violet" /><StatCard label="Pending orders" value="8" icon={Activity} delta="2.1%" note="vs. yesterday" color="orange" down /><StatCard label="Active repairs" value="11" icon={Wrench} delta="3 new" note="since yesterday" color="green" /><StatCard label="Low stock products" value="3" icon={Package} delta="Needs attention" note="restock soon" color="red" down /></div><div className="dashboard-main-grid"><SalesChart /><div className="side-stack"><RepairStatusCard /><LowStockAlert /></div></div><RecentOrdersTable /><footer className="page-footer"><span>© 2025 SmartCell Shop Manager</span><span>All amounts in Indian Rupees (INR)</span></footer></>
}
