import { NavLink, Outlet } from 'react-router'
import { AccountMenu } from '../components/AccountMenu'
import { Logo } from '../components/Logo'

const NAV_ITEMS = [
  { to: '/products', label: 'Linh kiện' },
  { to: '/combos', label: 'Combo PC' },
  { to: '/ai-builder', label: 'AI Builder' },
]

const CURRENT_YEAR = new Date().getFullYear()

const navClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
  }`

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
          <Logo />
          <nav className="hidden flex-1 items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <NavLink to="/cart" className={navClass}>Giỏ hàng</NavLink>
            <AccountMenu />
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500">
          © {CURRENT_YEAR} SmartBuild PC · Xây dựng cấu hình PC thông minh
        </div>
      </footer>
    </div>
  )
}
