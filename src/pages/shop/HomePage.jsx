import { Link } from 'react-router'

const HIGHLIGHTS = [
  { title: 'AI Builder', text: 'Nhập ngân sách và nhu cầu, AI đề xuất cấu hình tương thích.', to: '/ai-builder' },
  { title: 'Linh kiện', text: 'CPU, VGA, mainboard, RAM… lọc theo hãng, giá và thông số.', to: '/products' },
  { title: 'Combo PC', text: 'Bộ máy lắp sẵn cho học tập, văn phòng và gaming.', to: '/combos' },
]

export function HomePage() {
  return (
    <div className="space-y-10">
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

      <section className="grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <Link key={item.to} to={item.to} className="card p-5 transition hover:border-brand-500">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{item.text}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
