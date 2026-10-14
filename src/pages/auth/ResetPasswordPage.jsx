import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { authApi } from '../../api/auth'
import { FormError } from '../../components/FormError'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!token) {
    return (
      <div className="space-y-4">
        <FormError message="Liên kết đặt lại mật khẩu không hợp lệ." />
        <Link to="/forgot-password" className="text-sm text-brand-600 hover:underline">Gửi lại liên kết</Link>
      </div>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Hai mật khẩu không khớp.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await authApi.resetPassword(token, password)
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h1 className="text-xl font-bold">Đặt lại mật khẩu</h1>
      <FormError message={error} />
      <div>
        <label htmlFor="password" className="label">Mật khẩu mới</label>
        <input id="password" type="password" required autoComplete="new-password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="confirm" className="label">Nhập lại mật khẩu mới</label>
        <input id="confirm" type="password" required autoComplete="new-password" className="input" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </div>
      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang lưu…' : 'Lưu'}
      </button>
    </form>
  )
}
