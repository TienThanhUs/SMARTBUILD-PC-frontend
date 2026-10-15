import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  XIcon,
} from '../../components/Icons'
import { ProductCard, ProductCardSkeleton } from '../../components/ProductCard'
import { fetchAllProducts, filterAndSortProducts } from '../../services/productsService'

const CATEGORIES = [
  { key: 'ALL', label: 'Tất cả linh kiện' },
  { key: 'CPU', label: 'CPU / Vi xử lý' },
  { key: 'Mainboard', label: 'Bo mạch chủ' },
  { key: 'RAM', label: 'Bộ nhớ RAM' },
  { key: 'GPU', label: 'Card đồ họa' },
  { key: 'PSU', label: 'Nguồn máy tính' },
  { key: 'SSD', label: 'Ổ cứng SSD' },
  { key: 'Case', label: 'Vỏ máy tính' },
  { key: 'Cooler', label: 'Tản nhiệt' },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Mặc định (Nổi bật)' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A → Z' },
]

const ITEMS_PER_PAGE = 12

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'ALL'

  const [rawProducts, setRawProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const [toastMessage, setToastMessage] = useState('')

  const listTopRef = useRef(null)

  // Nạp dữ liệu 60 linh kiện từ /smartbuild_components_60.json
  useEffect(() => {
    let isMounted = true
    fetchAllProducts()
      .then((data) => {
        if (isMounted) {
          setRawProducts(data)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // Debounce tìm kiếm 250ms giúp trải nghiệm gõ mượt mà, không giật lag
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
      setCurrentPage(1)
    }, 250)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(rawProducts, {
      category: selectedCategory,
      query: debouncedQuery,
      sort: sortBy,
    })
  }, [rawProducts, selectedCategory, debouncedQuery, sortBy])

  // Thống kê số lượng theo từng danh mục
  const categoryCounts = useMemo(() => {
    const counts = { ALL: rawProducts.length }
    rawProducts.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return counts
  }, [rawProducts])

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Xử lý chuyển trang và tự động cuộn lên đầu danh sách
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return
    setCurrentPage(newPage)
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Xử lý đổi danh mục
  const handleSelectCategory = (catKey) => {
    setSelectedCategory(catKey)
    setCurrentPage(1)
    if (catKey === 'ALL') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', catKey)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const handleClearFilters = () => {
    setSelectedCategory('ALL')
    setSearchQuery('')
    setDebouncedQuery('')
    setSortBy('featured')
    setCurrentPage(1)
    setSearchParams({}, { replace: true })
  }

  const handleAddToCart = (product) => {
    setToastMessage(`Đã thêm "${product.name.slice(0, 30)}..." vào giỏ hàng`)
    setTimeout(() => {
      setToastMessage('')
    }, 2500)
  }

  return (
    <div className="space-y-8" ref={listTopRef}>
      {/* Toast thông báo nhanh */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-brand-200 bg-white/95 px-4 py-3 text-sm font-medium text-brand-900 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION: Phân cấp rõ ràng, tạo khoảng thở */}
      <div className="flex flex-col gap-3 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-100">
            <span className="size-1.5 rounded-full bg-brand-600" />
            <span>Kho linh kiện chính hãng · 60 sản phẩm chuẩn tương thích</span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Linh Kiện Máy Tính
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Dữ liệu linh kiện được tuyển chọn phổ biến nhất tại thị trường Việt Nam
          </p>
        </div>

        {/* Thống kê nhanh */}
        <div className="text-xs font-medium text-slate-500">
          Hiển thị{' '}
          <span className="font-semibold text-brand-600">
            {filteredProducts.length}
          </span>{' '}
          / {rawProducts.length} sản phẩm
        </div>
      </div>

      {/* SEARCH & FILTER CONTROLS: Đơn giản, trực quan, không bị ngợp */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Ô tìm kiếm thông minh */}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên linh kiện, chipset (RTX 4060, i5-13400F...), socket..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-10 text-sm shadow-xs outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                title="Xóa tìm kiếm"
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>

          {/* Sắp xếp */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="sortSelect" className="text-xs font-medium text-slate-500 whitespace-nowrap">
              Sắp xếp:
            </label>
            <select
              id="sortSelect"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 shadow-xs outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thanh danh mục dạng Pills bo tròn mềm mại */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.key] || 0
            const isActive = selectedCategory === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleSelectCategory(cat.key)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 ring-1 ring-slate-200/80 hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* PRODUCT GRID: Bố cục 4 cột rộng rãi, khoảng trắng cân đối */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State thân thiện */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs">
          <div className="grid size-12 place-items-center rounded-full bg-slate-100 text-slate-400">
            <SearchIcon className="size-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-ink">
            Không tìm thấy linh kiện phù hợp
          </h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">
            Không có sản phẩm nào khớp với từ khóa &ldquo;{debouncedQuery}&rdquo; trong danh mục hiện tại.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="mt-5 rounded-lg bg-brand-50 px-4 py-2 text-xs font-semibold text-brand-700 transition hover:bg-brand-100"
          >
            Xóa bộ lọc & Xem tất cả
          </button>
        </div>
      )}

      {/* PAGINATION: Phân trang chuẩn UX, rõ ràng và thanh thoát */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200/80 pt-6 sm:flex-row">
          <div className="text-xs text-slate-500">
            Đang hiển thị{' '}
            <span className="font-semibold text-ink">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            -{' '}
            <span className="font-semibold text-ink">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
            </span>{' '}
            trong tổng số{' '}
            <span className="font-semibold text-ink">{filteredProducts.length}</span>{' '}
            sản phẩm
          </div>

          <div className="flex items-center gap-1.5">
            {/* Nút Trước */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Trang trước"
              title="Trang trước"
            >
              <ChevronLeftIcon className="size-4" />
            </button>

            {/* Các số trang */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1
              const isActive = currentPage === pageNumber
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => handlePageChange(pageNumber)}
                  className={`size-9 rounded-lg text-xs font-semibold transition ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {pageNumber}
                </button>
              )
            })}

            {/* Nút Sau */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Trang sau"
              title="Trang sau"
            >
              <ChevronRightIcon className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
