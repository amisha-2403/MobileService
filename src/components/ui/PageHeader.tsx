import { ChevronRight } from 'lucide-react'
export default function PageHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="page-header"><div><div className="eyebrow">OVERVIEW <ChevronRight size={12} /> {title.toUpperCase()}</div><h1>{title}</h1><p>{description}</p></div>{action && <div>{action}</div>}</div>
}
