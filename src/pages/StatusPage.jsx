import { Link } from 'react-router'

export function StatusPage({ code, title, text }) {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="text-6xl font-bold text-brand-600">{code}</p>
        <h1 className="mt-2 text-xl font-semibold">{title}</h1>
        <p className="mt-1 text-slate-600">{text}</p>
        <Link to="/" className="btn-primary mt-6">Về trang chủ</Link>
      </div>
    </div>
  )
}
