import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { authApi } from '../../api/auth'
import { FormError } from '../../components/FormError'
import { PasswordInput } from '../../components/PasswordInput'

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
        <FormError message="Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn." />
        <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:underline">
          Gửi lại liên kết
        </Link>
      </div>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) {
      setError('Mật khẩu mới cần ít nhất 8 ký tự.')
      return
    }
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
      setError(err.message ?? 'Không thể đặt lại mật khẩu. Vui lòng thử lại.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Đặt lại mật khẩu</h1>
        <p className="mt-1 text-sm text-slate-500">Thiết lập mật khẩu bảo mật mới cho tài khoản của bạn.</p>
      </div>

      <div>
        <label htmlFor="password" className="label">Mật khẩu mới</label>
        <PasswordInput
          id="password"
          name="password"
          required
          autoComplete="new-password"
          placeholder="Tối thiểu 8 ký tự"
          value={password}
          onChange={(e) => {
            if (error) setError('')
            setPassword(e.target.value)
          }}
        />
        <p className="mt-1 text-xs text-slate-400">Mật khẩu cần ít nhất 8 ký tự.</p>
      </div>

      <div>
        <label htmlFor="confirm" className="label">Nhập lại mật khẩu mới</label>
        <PasswordInput
          id="confirm"
          name="confirm"
          required
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu mới"
          value={confirm}
          onChange={(e) => {
            if (error) setError('')
            setConfirm(e.target.value)
          }}
        />
      </div>

      {error && <FormError message={error} className="mt-2" />}

      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang lưu…' : 'Lưu mật khẩu mới'}
      </button>

      <p className="text-center text-sm text-slate-600">
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Quay lại đăng nhập
        </Link>
      </p>
    </form>
  )
}
