import { Link } from 'react-router'

export function Logo({ to = '/' }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-bold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm text-white">SB</span>
      <span className="text-lg">
        SmartBuild <span className="text-brand-600">PC</span>
      </span>
    </Link>
  )
}
