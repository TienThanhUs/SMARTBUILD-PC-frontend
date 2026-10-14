import { NavLink, Outlet } from 'react-router'
import { AccountMenu } from '../components/AccountMenu'
import { Logo } from '../components/Logo'
import { useAuth } from '../auth/AuthContext'
import { ROLES } from '../auth/roles'

const STAFF_ITEMS = [
  { to: '/staff/orders', label: 'Đơn hàng' },
  { to: '/staff/inventory', label: 'Tồn kho' },
]

const ADMIN_ITEMS = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/categories', label: 'Danh mục' },
  { to: '/admin/products', label: 'Sản phẩm' },
  { to: '/admin/combos', label: 'Combo' },
  { to: '/admin/datasets', label: 'Dataset linh kiện' },
  { to: '/admin/compatibility-rules', label: 'Quy tắc tương thích' },
  { to: '/admin/coupons', label: 'Mã giảm giá' },
  { to: '/admin/users', label: 'Tài khoản' },
  { to: '/admin/audit-logs', label: 'Nhật ký thao tác' },
]

const linkClass = ({ isActive }) =>
  `block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
  }`

function SidebarGroup({ title, items }) {
  return (
    <div>
      <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <div className="flex gap-1 md:block md:space-y-1">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} className={linkClass}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

// Shell for STAFF and ADMIN screens. Admins also see the staff tools.
export function DashboardLayout() {
  const { user } = useAuth()
  const isAdmin = user?.role === ROLES.ADMIN

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-ink md:w-64 md:shrink-0">
        <div className="flex h-16 items-center px-4 text-white [&_a]:text-white">
          <Logo to={isAdmin ? '/admin/dashboard' : '/staff/orders'} />
        </div>
        <nav className="flex gap-4 overflow-x-auto px-3 pb-3 md:block md:space-y-6 md:pb-6">
          {isAdmin && <SidebarGroup title="Quản trị" items={ADMIN_ITEMS} />}
          <SidebarGroup title="Vận hành" items={STAFF_ITEMS} />
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <span className="text-sm text-slate-500">
            {isAdmin ? 'Khu vực quản trị' : 'Khu vực nhân viên'}
          </span>
          <AccountMenu />
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
