import { Link } from 'react-router'
import { formatPrice } from '../utils/format'

const MAX_PARTS_SHOWN = 4

// One item of GET /combos: { id, name, price, items: [{ productId, name, quantity }] }.
export function ComboCard({ combo }) {
  const parts = combo.items ?? []
  const hidden = parts.length - MAX_PARTS_SHOWN

  return (
    <Link to={`/combos/${combo.id}`} className="card flex flex-col p-5 transition hover:border-brand-500">
      <h3 className="font-semibold">{combo.name}</h3>
      <ul className="mt-3 space-y-1 text-sm text-slate-600">
        {parts.slice(0, MAX_PARTS_SHOWN).map((part) => (
          <li key={part.productId} className="truncate">
            {part.quantity > 1 && <span className="font-medium">{part.quantity} × </span>}
            {part.name}
          </li>
        ))}
        {hidden > 0 && <li className="text-slate-400">+{hidden} linh kiện khác</li>}
      </ul>
      <p className="mt-auto pt-4 text-lg font-bold text-brand-700">{formatPrice(combo.price)}</p>
    </Link>
  )
}
