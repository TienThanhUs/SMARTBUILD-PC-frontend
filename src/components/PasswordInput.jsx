import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from './Icons'

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  autoComplete = 'current-password',
  required = false,
  className = '',
  disabled = false,
  ...rest
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        className={`input pr-10 ${className}`}
        {...rest}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow((prev) => !prev)}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition hover:text-slate-600 focus:outline-none"
        aria-label={show ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
        title={show ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
      >
        {show ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
      </button>
    </div>
  )
}
