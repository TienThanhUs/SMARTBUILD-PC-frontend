import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { catalogApi } from '../../api/catalog'
import { ArrowRightIcon, ComponentIcon, PcTowerIcon, SparklesIcon } from '../../components/Icons'
import { HeroIllustration } from '../../components/HeroIllustration'
import { ProductCard, ProductCardSkeleton } from '../../components/ProductCard'
import { fetchAllProducts } from '../../services/productsService'

// 3 Card chức năng chính với icon màu xanh chủ đạo ở góc trên bên trái
const HIGHLIGHTS = [
  {
    icon: SparklesIcon,
    title: 'AI PC Builder',
    text: 'Nhập ngân sách và nhu cầu, AI đề xuất cấu hình tương thích 100% trong tích tắc.',
    to: '/ai-builder',
    badge: 'Đột phá',
  },
  {
    icon: ComponentIcon,
    title: 'Linh kiện chính hãng',
    text: 'CPU, VGA, Mainboard, RAM, SSD… lọc chính xác theo hãng, thông số và khoảng giá.',
    to: '/products',
    badge: '10.000+ SP',
  },
  {
    icon: PcTowerIcon,
    title: 'Combo PC lắp sẵn',
    text: 'Bộ máy hoàn chỉnh tối ưu cho học tập, đồ họa, render 3D và gaming đỉnh cao.',
    to: '/combos',
    badge: 'Bảo hành 3 năm',
  },
]

// Dữ liệu mẫu linh kiện nổi bật (Mock data chuẩn theo spec Backend Spring Boot)
const FEATURED_PRODUCTS_FALLBACK = [
  {
    id: 1,
    name: 'VGA ASUS ROG Strix GeForce RTX 4070 Ti SUPER 16GB GDDR6X',
    categoryName: 'Card đồ họa',
    specs: '16GB GDDR6X · 256-bit · 3 Fan',
    price: 24890000,
    originalPrice: 26990000,
    badge: 'HOT',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'CPU Intel Core i7-14700K (Up to 5.60GHz, 20 Nhân 28 Luồng)',
    categoryName: 'Vi xử lý',
    specs: 'LGA1700 · 33MB Cache · 125W',
    price: 10890000,
    originalPrice: 11500000,
    badge: 'Mới',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Mainboard MSI MAG B760 TOMAHAWK WIFI DDR5',
    categoryName: 'Bo mạch chủ',
    specs: 'ATX · LGA1700 · PCIe 5.0 · Wi-Fi 6E',
    price: 5290000,
    originalPrice: 5690000,
    badge: 'Bán chạy',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    categoryName: 'Bộ nhớ RAM',
    specs: '32GB (2x16GB) · CL36 · Đen',
    price: 3290000,
    originalPrice: 3590000,
    badge: '-8%',
    imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Ổ cứng SSD Samsung 990 PRO 1TB M.2 NVMe PCIe 4.0',
    categoryName: 'Ổ cứng',
    specs: 'Read 7450MB/s · Write 6900MB/s',
    price: 2790000,
    originalPrice: 3190000,
    badge: 'Top Tốc Độ',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Nguồn máy tính Corsair RM850e 850W 80 Plus Gold ATX 3.0',
    categoryName: 'Nguồn PC',
    specs: '850W · Fully Modular · PCIe 5.0 12VHPWR',
    price: 3490000,
    originalPrice: 3890000,
    badge: 'Bền bỉ',
    imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Tản nhiệt nước AIO DeepCool LT720 RGB 360mm',
    categoryName: 'Tản nhiệt',
    specs: 'Radiator 360mm · Bơm gen 4 · Hiệu ứng Infinity Mirror',
    price: 3150000,
    originalPrice: 3450000,
    badge: 'Mát mẻ',
    imageUrl: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    name: 'Vỏ Case NZXT H9 Flow White (Kính cường lực kép)',
    categoryName: 'Vỏ máy tính',
    specs: 'Dual-Chamber Mid-Tower · Hỗ trợ GPU 435mm',
    price: 3990000,
    originalPrice: 4290000,
    badge: 'Thiết kế',
    imageUrl: 'https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80',
  },
]

export function HomePage() {
  const [products, setProducts] = useState(FEATURED_PRODUCTS_FALLBACK)
  const [loading, setLoading] = useState(true)
  const [toastMessage, setToastMessage] = useState('')

  // Đồng bộ với API Backend hoặc nạp trực tiếp từ dataset 60 linh kiện SmartBuild PC
  useEffect(() => {
    let isMounted = true

    catalogApi
      .getProducts({ size: 8 })
      .then((data) => {
        if (!isMounted) return
        if (data?.items && data.items.length > 0) {
          setProducts(data.items)
          return
        }
        throw new Error('No backend items')
      })
      .catch(() => {
        return fetchAllProducts()
      })
      .then((all) => {
        if (!isMounted || !all || all.length === 0) return
        // Đại diện 8 linh kiện từ 8 danh mục
        const categories = ['CPU', 'Mainboard', 'RAM', 'GPU', 'PSU', 'SSD', 'Case', 'Cooler']
        const sample = categories.map((cat) => all.find((p) => p.category === cat)).filter(Boolean)
        setProducts(sample.length > 0 ? sample : all.slice(0, 8))
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const handleAddToCart = (product) => {
    setToastMessage(`Đã thêm "${product.name.slice(0, 32)}..." vào giỏ hàng`)
    setTimeout(() => {
      setToastMessage('')
    }, 2500)
  }

  return (
    <div className="space-y-12">
      {/* Toast thông báo nhanh khi thêm vào giỏ */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-brand-200 bg-white/95 px-4 py-3 text-sm font-medium text-brand-900 shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO BANNER: Thêm minh họa 3D isometric linh kiện máy tính ở góc phải */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 px-6 py-12 text-white shadow-xl sm:px-12 lg:py-16">
        {/* Họa tiết trang trí trừu tượng dạng mờ (opacity thấp) */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-0 size-96 rounded-full bg-brand-500/15 blur-3xl" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12">
          {/* Nội dung bên trái */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-100 backdrop-blur-sm">
              <SparklesIcon className="size-3.5 text-cyan-300" />
              <span>SmartBuild PC 2.0 · Công nghệ gợi ý thông minh</span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight leading-tight sm:text-5xl">
              Build PC chuẩn xác, <br className="hidden sm:inline" />
              đúng ngân sách với <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-white bg-clip-text text-transparent">AI thông minh</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-brand-100/90 sm:text-lg">
              SmartBuild PC tự động kiểm tra tương thích giữa CPU, Mainboard, RAM và VGA, hạn chế nghẽn cổ chai và giao máy lắp ráp hoàn thiện tận nơi.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/ai-builder"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand-700 shadow-md transition hover:bg-brand-50 hover:shadow-lg active:scale-98"
              >
                <SparklesIcon className="size-4 text-brand-600" />
                <span>Thử AI Builder</span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold backdrop-blur-sm transition hover:bg-white/15"
              >
                <span>Xem linh kiện</span>
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          {/* Minh họa 3D linh kiện máy tính ở góc bên phải (GPU, Mainboard & Hiệu ứng mạch điện) */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <HeroIllustration className="w-full max-w-md lg:max-w-lg transition-transform duration-500 hover:scale-105" />
          </div>
        </div>
      </section>

      {/* 2. 3 CARD CHỨC NĂNG: Thêm icon nhận diện màu xanh chủ đạo ở góc trên bên trái */}
      <section className="grid gap-6 sm:grid-cols-3">
        {HIGHLIGHTS.map((item) => {
          const IconComponent = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className="card group relative flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-400 hover:shadow-md"
            >
              {/* Badge góc phải */}
              <span className="absolute top-6 right-6 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 transition group-hover:bg-brand-50 group-hover:text-brand-700">
                {item.badge}
              </span>

              {/* Icon góc trên bên trái: kích thước vừa phải, màu xanh thương hiệu chủ đạo */}
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition duration-200 group-hover:bg-brand-600 group-hover:text-white">
                <IconComponent className="size-6" />
              </div>

              <h2 className="text-lg font-bold text-ink transition group-hover:text-brand-600">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {item.text}
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition group-hover:translate-x-1">
                <span>Khám phá ngay</span>
                <ArrowRightIcon className="size-3.5" />
              </div>
            </Link>
          )
        })}
      </section>

      {/* 3. BỔ SUNG QUAN TRỌNG: SECTION "LINH KIỆN NỔI BẬT" (GRID 4 CỘT) */}
      <section className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
              <span className="inline-block size-2 rounded-full bg-brand-600" />
              Sản phẩm tuyển chọn
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Linh kiện nổi bật
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Được bảo hành chính hãng và đồng bộ hoàn hảo với thuật toán AI PC Builder
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>Xem tất cả linh kiện</span>
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {/* Layout Grid 4 cột (responsive 1 -> 2 -> 4 cột) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            : products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
        </div>
      </section>
    </div>
  )
}
