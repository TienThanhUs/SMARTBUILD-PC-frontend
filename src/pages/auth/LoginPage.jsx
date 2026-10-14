import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../../auth/AuthContext'
import { homeForRole } from '../../auth/roles'
import { FormError } from '../../components/FormError'

const ERROR_BY_STATUS = {
  401: 'Email hoặc mật khẩu không đúng.',
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

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const signedIn = await login(form)
      const from = location.state?.from?.pathname
      navigate(from || homeForRole(signedIn.role), { replace: true })
    } catch (err) {
      setError(ERROR_BY_STATUS[err.status] ?? err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Đăng nhập</h1>
        <p className="text-sm text-slate-500">Chào mừng bạn quay lại SmartBuild PC.</p>
      </div>
      <FormError message={error} />
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" value={form.email} onChange={onChange} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">Mật khẩu</label>
          <Link to="/forgot-password" className="mb-1 text-sm text-brand-600 hover:underline">Quên mật khẩu?</Link>
        </div>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" value={form.password} onChange={onChange} />
      </div>
      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang đăng nhập…' : 'Đăng nhập'}
      </button>
      <p className="text-center text-sm text-slate-600">
        Chưa có tài khoản? <Link to="/register" className="font-medium text-brand-600 hover:underline">Đăng ký</Link>
      </p>
    </form>
  )
}
