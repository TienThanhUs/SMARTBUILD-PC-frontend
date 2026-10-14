import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { authApi } from '../../api/auth'
import { FormError } from '../../components/FormError'

const FIELDS = [
  { name: 'fullName', label: 'Họ và tên', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Số điện thoại', type: 'tel', autoComplete: 'tel' },
  { name: 'password', label: 'Mật khẩu', type: 'password', autoComplete: 'new-password' },
]

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await authApi.register(form)
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.status === 409 ? 'Email này đã được đăng ký.' : err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Tạo tài khoản</h1>
        <p className="text-sm text-slate-500">Đăng ký để lưu cấu hình và đặt hàng.</p>
      </div>
      <FormError message={error} />
      {FIELDS.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="label">{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            className="input"
            value={form[field.name]}
            onChange={onChange}
          />
        </div>
      ))}
      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang đăng ký…' : 'Đăng ký'}
      </button>
      <p className="text-center text-sm text-slate-600">
        Đã có tài khoản? <Link to="/login" className="font-medium text-brand-600 hover:underline">Đăng nhập</Link>
      </p>
    </form>
  )
}
