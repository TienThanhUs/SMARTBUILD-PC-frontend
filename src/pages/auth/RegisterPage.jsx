import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { authApi } from '../../api/auth'
import { FormError } from '../../components/FormError'
import { PasswordInput } from '../../components/PasswordInput'

// Regex số điện thoại di động Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09 hoặc +84)
const VN_PHONE_REGEX = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => {
    if (error) setError('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validations
    const cleanPhone = form.phone.trim().replace(/\s+/g, '')
    if (!VN_PHONE_REGEX.test(cleanPhone)) {
      setError('Số điện thoại không đúng định dạng Việt Nam (10 chữ số, ví dụ 0912345678).')
      return
    }

    if (form.password.length < 8) {
      setError('Mật khẩu cần ít nhất 8 ký tự.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }

    setSubmitting(true)
    try {
      // Chỉ gửi đúng DTO backend yêu cầu (không gửi thừa confirmPassword)
      const { confirmPassword: _discard, ...backendPayload } = form
      await authApi.register({
        ...backendPayload,
        phone: cleanPhone,
      })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(
        err.status === 409
          ? 'Email đã tồn tại trên hệ thống.'
          : err.message ?? 'Đăng ký không thành công. Vui lòng thử lại.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-ink">Tạo tài khoản</h1>
        <p className="mt-1 text-sm text-slate-500">Đăng ký để lưu cấu hình PC và đặt hàng dễ dàng.</p>
      </div>

      {/* Họ và tên */}
      <div>
        <label htmlFor="fullName" className="label">Họ và tên</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
          placeholder="Nguyễn Văn A"
          className="input"
          value={form.fullName}
          onChange={onChange}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="name@example.com"
          className="input"
          value={form.email}
          onChange={onChange}
        />
      </div>

      {/* Số điện thoại & Helper text */}
      <div>
        <label htmlFor="phone" className="label">Số điện thoại</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          placeholder="0912 345 678"
          className="input"
          value={form.phone}
          onChange={onChange}
        />
        <p className="mt-1 text-xs text-slate-400">
          Sử dụng định dạng số điện thoại Việt Nam (VD: 09xx, 08xx, 03xx...).
        </p>
      </div>

      {/* Mật khẩu & Helper text */}
      <div>
        <label htmlFor="password" className="label">Mật khẩu</label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          required
          placeholder="Tối thiểu 8 ký tự"
          value={form.password}
          onChange={onChange}
        />
        <p className="mt-1 text-xs text-slate-400">Mật khẩu cần ít nhất 8 ký tự.</p>
      </div>

      {/* Nhập lại mật khẩu */}
      <div>
        <label htmlFor="confirmPassword" className="label">Nhập lại mật khẩu</label>
        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="new-password"
          required
          placeholder="Nhập lại mật khẩu đã chọn"
          value={form.confirmPassword}
          onChange={onChange}
        />
      </div>

      {/* Error state: vị trí ngay phía trên nút "Đăng ký", mặc định ẩn khi không có lỗi */}
      {error && <FormError message={error} className="mt-2" />}

      <button type="submit" className="btn-primary w-full" disabled={submitting}>
        {submitting ? 'Đang đăng ký…' : 'Đăng ký'}
      </button>

      <p className="text-center text-sm text-slate-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}
