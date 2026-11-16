import { ArrowUpRight, Clock3, Wrench } from 'lucide-react'
import { repairs } from '../../data/mockData'
import StatusBadge from '../ui/StatusBadge'
export default function RepairStatusCard() {
  return <section className="card list-card"><div className="card-title-row"><div><h2>Repair overview</h2><p>Keep track of service jobs</p></div><a className="text-link" href="/admin/repairs">View all <ArrowUpRight size={14} /></a></div><div className="repair-metrics"><div><strong>3</strong><span>New</span></div><div><strong>6</strong><span>In progress</span></div><div><strong>2</strong><span>Ready</span></div></div><div className="compact-list">{repairs.map(repair => <div className="repair-row" key={repair.id}><span className={`repair-icon ${repair.color}`}><Wrench size={16} /></span><div className="repair-info"><div><strong>{repair.id}</strong><span>{repair.device}</span></div><small>{repair.name} · {repair.issue}</small><small className="repair-due"><Clock3 size={12} /> {repair.due}</small></div><StatusBadge tone={repair.color === 'green' ? 'ready' : repair.color === 'orange' ? 'pending' : 'processing'}>{repair.status}</StatusBadge></div>)}</div></section>
}
