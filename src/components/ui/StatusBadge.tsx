type Props = { children: string; tone?: string }
export default function StatusBadge({ children, tone }: Props) {
  const key = tone ?? children.toLowerCase().replaceAll(' ', '-')
  return <span className={`badge badge-${key}`}>{children}</span>
}
