import { Outlet } from 'react-router'
import { Logo } from '../components/Logo'

export function AuthLayout() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-brand-50 to-slate-100 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="card p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
