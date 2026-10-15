import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../auth/AuthContext'
import { homeForRole } from '../../auth/roles'
import { FormError } from '../../components/FormError'
import { PasswordInput } from '../../components/PasswordInput'

const ERROR_BY_STATUS = {
  401: 'Email hoặc mật khẩu không chính xác.',
  403: 'Tài khoản của bạn đã bị khóa.',
}

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to={homeForRole(user.role)} replace />

  const onChange = (e) => {
    if (error) setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const signedIn = await login(form)
      const from = location.state?.from?.pathname
      navigate(from || homeForRole(signedIn.role), { replace: true })
    } catch (err) {
      setError(ERROR_BY_STATUS[err.status] ?? err.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Đăng nhập</h1>
        <p className="mt-1 text-sm text-slate-500">Chào mừng bạn quay lại SmartBuild PC.</p>
      </div>

      <div>
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@example.com"
          className="input"
          value={form.email}
          onChange={onChange}
        />
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">Mật khẩu</label>
          <Link to="/forgot-password" className="mb-1 text-xs font-medium text-brand-600 hover:underline">
            Quên mật khẩu?
          </Link>
        </div>
        <PasswordInput
          id="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={onChange}
        />
      </div>

      {/* Error state: vị trí ngay phía trên nút "Đăng nhập", mặc định ẩn khi không có lỗi */}
      {error && <FormError message={error} className="mt-2" />}

      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>

      <p className="text-center text-sm text-slate-600">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  )
}
