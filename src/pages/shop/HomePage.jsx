import { Link } from 'react-router'
import { catalogApi } from '../../api/catalog'
import { ComboCard } from '../../components/ComboCard'
import { ProductCard } from '../../components/ProductCard'
import { useApi } from '../../hooks/useApi'

const FEATURED_PRODUCTS = 8
const FEATURED_COMBOS = 3

export function HomePage() {
  const categories = useApi(() => catalogApi.getCategories())
  const products = useApi(() => catalogApi.getProducts({ size: FEATURED_PRODUCTS }))
  const combos = useApi(() => catalogApi.getCombos({ size: FEATURED_COMBOS }))

  return (
    <div className="space-y-12">
      <section className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-700 px-6 py-12 text-white sm:px-12">
        <h1 className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Build PC đúng nhu cầu, đúng ngân sách với AI
        </h1>
        <p className="mt-3 max-w-xl text-brand-100">
          SmartBuild PC kiểm tra tương thích linh kiện tự động và giao máy đã lắp ráp tận nơi.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/ai-builder" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50">
            Thử AI Builder
          </Link>
          <Link to="/products" className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10">
            Xem linh kiện
          </Link>
        </div>
      </section>

      <Section title="Danh mục linh kiện" state={categories} empty="Chưa có danh mục nào.">
        {(list) => (
          <div className="flex flex-wrap gap-2">
            {list.map((category) => (
              <Link
                key={category.id}
                to={`/products?categoryId=${category.id}`}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand-500 hover:text-brand-700"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section title="Sản phẩm nổi bật" moreTo="/products" state={products} pick={(data) => data.items} empty="Chưa có sản phẩm nào.">
        {(list) => (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Section>

      <Section title="Combo PC lắp sẵn" moreTo="/combos" state={combos} pick={(data) => data.items} empty="Chưa có combo nào.">
        {(list) => (
          <div className="grid gap-4 md:grid-cols-3">
            {list.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

// Heading + the loading / error / empty / data states of one API call.
function Section({ title, moreTo, state, pick = (data) => data, empty, children }) {
  const list = state.data ? pick(state.data) ?? [] : []

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {moreTo && (
          <Link to={moreTo} className="text-sm font-medium text-brand-600 hover:underline">
            Xem tất cả
          </Link>
        )}
      </div>
      {state.loading ? (
        <div className="h-24 animate-pulse rounded-2xl bg-slate-200/70" />
      ) : state.error ? (
        <div className="card flex flex-wrap items-center justify-between gap-3 p-5 text-sm">
          <span className="text-slate-600">Chưa tải được dữ liệu. {state.error.message}</span>
          <button type="button" onClick={state.reload} className="btn-ghost">
            Thử lại
          </button>
        </div>
      ) : list.length === 0 ? (
        <p className="card p-5 text-sm text-slate-500">{empty}</p>
      ) : (
        children(list)
      )}
    </section>
  )
}
