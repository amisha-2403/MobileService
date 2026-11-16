import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from 'lucide-react'
export default function StatCard({ label, value, icon: Icon, delta, note, color, down }: { label: string; value: string; icon: LucideIcon; delta: string; note: string; color: string; down?: boolean }) {
  return <article className="stat-card"><div className="stat-top"><span>{label}</span><button className="quiet-icon" aria-label={`${label} options`}><MoreHorizontal size={18} /></button></div><div className="stat-middle"><strong>{value}</strong><span className={`stat-icon ${color}`}><Icon size={19} strokeWidth={1.9} /></span></div><div className="stat-foot"><span className={`delta ${down ? 'delta-down' : ''}`}>{down ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}{delta}</span><span>{note}</span></div></article>
}
