import { Link, useNavigate } from 'react-router'
import { useAuth } from '../auth/AuthContext'
import { ROLES } from '../auth/roles'

export function AccountMenu() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <Link to="/login" className="btn-ghost">Đăng nhập</Link>
        <Link to="/register" className="btn-primary">Đăng ký</Link>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <details className="relative">
      <summary className="btn-ghost cursor-pointer list-none gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
          {user.fullName?.[0]?.toUpperCase() ?? '?'}
        </span>
        <span className="hidden max-w-32 truncate sm:inline">{user.fullName}</span>
      </summary>
      <div className="card absolute right-0 z-20 mt-2 w-52 p-1 text-sm">
        <Link to="/profile" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Hồ sơ cá nhân</Link>
        {user.role === ROLES.CUSTOMER && (
          <>
            <Link to="/orders" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Đơn hàng của tôi</Link>
            <Link to="/account/addresses" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Sổ địa chỉ</Link>
          </>
        )}
        {user.role === ROLES.STAFF && (
          <Link to="/staff/orders" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Trang nhân viên</Link>
        )}
        {user.role === ROLES.ADMIN && (
          <Link to="/admin/dashboard" className="block rounded-lg px-3 py-2 hover:bg-slate-100">Trang quản trị</Link>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="block w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50"
        >
          Đăng xuất
        </button>
      </div>
    </details>
  )
}
