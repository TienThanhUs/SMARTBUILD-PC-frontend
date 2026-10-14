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
      setMessage(data.message)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Quên mật khẩu</h1>
        <p className="text-sm text-slate-500">Nhập email, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu.</p>
      </div>
      <FormError message={error} />
      {message ? (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>
      ) : (
        <>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" type="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Đang gửi…' : 'Gửi'}
          </button>
        </>
      )}
      <p className="text-center text-sm">
        <Link to="/login" className="text-brand-600 hover:underline">Quay lại đăng nhập</Link>
      </p>
    </form>
  )
}
