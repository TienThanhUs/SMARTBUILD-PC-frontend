import { Link } from 'react-router'
import { formatPrice } from '../utils/format'

// One item of GET /products: { id, name, price, image, stock, category }.
export function ProductCard({ product }) {
  const outOfStock = product.stock === 0

  return (
    <Link to={`/products/${product.id}`} className="card group flex flex-col overflow-hidden transition hover:border-brand-500">
      <div className="relative aspect-square bg-slate-100">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain p-4" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Chưa có ảnh</div>
        )}
        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-800/80 px-2 py-0.5 text-xs font-medium text-white">
            Hết hàng
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category?.name && <span className="text-xs text-slate-500">{product.category.name}</span>}
        <h3 className="line-clamp-2 text-sm font-medium group-hover:text-brand-700">{product.name}</h3>
        <p className="mt-auto pt-2 font-semibold text-brand-700">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
