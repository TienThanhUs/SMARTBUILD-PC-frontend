import { AlertCircleIcon } from './Icons'

export function FormError({ message, className = '' }) {
  if (!message) return null
  return (
    <div
      role="alert"
      className={`flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 animate-in fade-in duration-150 ${className}`}
    >
      <AlertCircleIcon className="size-4 shrink-0 text-red-500" />
      <span>{message}</span>
    </div>
  )
}
