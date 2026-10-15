import { useState } from 'react'
import { Link } from 'react-router'
import { CheckIcon, ShoppingCartIcon } from './Icons'
import { formatCurrencyVND } from '../utils/format'

function getSpecsSummary(specs) {
  if (!specs) return null
  if (typeof specs === 'string') return specs
  if (typeof specs === 'object') {
    if (specs.socket && specs.cores) {
      return `${specs.socket} · ${specs.cores} Nhân / ${specs.threads} Luồng · ${specs.tdp}W`
    }
    if (specs.chipset && specs.socket) {
      return `${specs.chipset} · ${specs.socket} · ${specs.ramType || ''} · ${specs.formFactor || ''}`
    }
    if (specs.chipset && specs.vramGb) {
      return `${specs.chipset} · ${specs.vramGb}GB ${specs.vramType || ''} · ${specs.lengthMm ? `${specs.lengthMm}mm` : ''}`
    }
    if (specs.ramType && specs.capacityGb) {
      return `${specs.ramType} · ${specs.capacityGb}GB · ${specs.busSpeed}MHz ${specs.rgb ? '· RGB' : ''}`
    }
    if (specs.wattage) {
      return `${specs.wattage}W · ${specs.efficiency} · ${specs.modularity}`
    }
    if (specs.capacityGb && specs.readSpeed) {
      const cap = specs.capacityGb >= 1000 ? `${specs.capacityGb / 1000}TB` : `${specs.capacityGb}GB`
      return `${cap} · Đọc ${specs.readSpeed}MB/s · ${specs.formFactor || 'M.2'}`
    }
    if (specs.maxGpuLengthMm) {
      return `${specs.formFactor} · GPU max ${specs.maxGpuLengthMm}mm`
    }
    if (specs.coolerType) {
      return `${specs.coolerType} · TDP max ${specs.maxTdpSupport || specs.maxTdp || 250}W`
    }
  }
  return null
}

export function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdded(true)
    if (onAddToCart) {
      onAddToCart(product)
    }
    setTimeout(() => {
      setAdded(false)
    }, 1600)
  }

  const {
    id,
    name,
    categoryName,
    category,
    specs,
    price,
    originalPrice,
    imageUrl,
    image_url,
    badge,
  } = product

  const displayCategory = categoryName || category || ''
  const displayImage = image_url || imageUrl || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80'
  const displaySpecs = getSpecsSummary(specs)

  return (
    <div className="card group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-brand-400 hover:shadow-md bg-white">
      {/* Product Image & Badges */}
      <Link to={`/products/${id}`} className="relative block aspect-square w-full overflow-hidden bg-slate-50 p-4">
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-brand-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
            {badge}
          </span>
        )}
        {displayCategory && (
          <span className="absolute right-3 top-3 z-10 rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-brand-700 shadow-xs ring-1 ring-slate-200/60 backdrop-blur-xs">
            {displayCategory}
          </span>
        )}

        <img
          src={displayImage}
          alt={name}
          loading="lazy"
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80'
          }}
        />
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Specs snippet */}
        {displaySpecs && (
          <p className="mb-1 text-xs font-medium text-slate-500 line-clamp-1" title={displaySpecs}>
            {displaySpecs}
          </p>
        )}

        {/* Title */}
        <Link
          to={`/products/${id}`}
          className="font-semibold text-ink line-clamp-2 transition hover:text-brand-600 leading-snug"
          title={name}
        >
          {name}
        </Link>

        {/* Bottom Section: Price & Add to Cart button */}
        <div className="mt-auto pt-4 flex items-end justify-between gap-2 border-t border-slate-100">
          <div>
            <div className="text-base font-bold text-brand-600 sm:text-lg">
              {formatCurrencyVND(price)}
            </div>
            {originalPrice && originalPrice > price && (
              <div className="text-xs text-slate-400 line-through">
                {formatCurrencyVND(originalPrice)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 ${
              added
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white'
            }`}
            aria-label={`Thêm ${name} vào giỏ`}
            title={added ? 'Đã thêm vào giỏ!' : 'Thêm vào giỏ'}
          >
            {added ? (
              <>
                <CheckIcon className="size-4" />
                <span>Đã thêm</span>
              </>
            ) : (
              <>
                <ShoppingCartIcon className="size-4" />
                <span>Thêm</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Skeleton loader component during data fetch
export function ProductCardSkeleton() {
  return (
    <div className="card flex flex-col overflow-hidden animate-pulse bg-white">
      <div className="aspect-square w-full bg-slate-200/80" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-1/3 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="h-5 w-24 bg-slate-200 rounded" />
          <div className="h-8 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  )
}
