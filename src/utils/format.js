// Currency and date formatting helpers for SmartBuild PC

export function formatCurrencyVND(amount) {
  if (typeof amount !== 'number') return amount || '0 ₫'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount)
}
