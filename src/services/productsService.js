// Service quản lý và truy xuất dữ liệu 60 linh kiện SmartBuild PC

let cachedProducts = null

export async function fetchAllProducts() {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts
  }

  try {
    const res = await fetch('/smartbuild_components_60.json')
    if (res.ok) {
      const data = await res.json()
      cachedProducts = data
      return data
    }
  } catch (err) {
    console.warn('Không thể nạp từ /smartbuild_components_60.json, sử dụng fallback', err)
  }

  // Fallback nếu fetch public thất bại
  return []
}

export function filterAndSortProducts(products, {
  category = 'ALL',
  query = '',
  sort = 'featured',
}) {
  let list = [...products]

  // 1. Lọc theo danh mục
  if (category && category !== 'ALL') {
    list = list.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase(),
    )
  }

  // 2. Tìm kiếm theo từ khóa (tên, danh mục, thông số kỹ thuật)
  if (query && query.trim() !== '') {
    const q = query.toLowerCase().trim()
    list = list.filter((item) => {
      if (item.name.toLowerCase().includes(q)) return true
      if (item.category.toLowerCase().includes(q)) return true
      if (item.specs) {
        if (typeof item.specs === 'string' && item.specs.toLowerCase().includes(q)) return true
        if (typeof item.specs === 'object') {
          const specsStr = JSON.stringify(item.specs).toLowerCase()
          if (specsStr.includes(q)) return true
        }
      }
      return false
    })
  }

  // 3. Sắp xếp
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      list.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
      break
    case 'featured':
    default:
      // Giữ nguyên thứ tự ID sắp xếp ban đầu
      list.sort((a, b) => a.id - b.id)
      break
  }

  return list
}
