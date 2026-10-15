import { useState } from 'react'
import { Link } from 'react-router'
import { authApi } from '../../api/auth'
import { FormError } from '../../components/FormError'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const data = await authApi.forgotPassword(email)
      setMessage(data.message || 'Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.')
    } catch (err) {
      setError(err.message ?? 'Không tìm thấy tài khoản với email này.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Quên mật khẩu</h1>
        <p className="mt-1 text-sm text-slate-500">Nhập email, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.</p>
      </div>

      {message ? (
        <div className="space-y-4">
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">
            {message}
          </p>
          <Link to="/login" className="btn-primary block w-full text-center">
            Quay lại đăng nhập
          </Link>
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="input"
              value={email}
              onChange={(e) => {
                if (error) setError('')
                setEmail(e.target.value)
              }}
            />
          </div>

          {error && <FormError message={error} className="mt-2" />}

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Đang gửi…' : 'Gửi liên kết đặt lại'}
          </button>

          <p className="text-center text-sm">
            <Link to="/login" className="font-medium text-brand-600 hover:underline">
              Quay lại đăng nhập
            </Link>
          </p>
        </>
      )}
    </form>
  )
}
