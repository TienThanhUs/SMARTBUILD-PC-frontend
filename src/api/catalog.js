import { apiClient } from './client'

// Section 2 "Danh mục & Sản phẩm". List endpoints take { page, size, ... }
// and return { items, page, totalPages, totalElements }.
export const catalogApi = {
  getCategories: () => apiClient.get('/categories').then((r) => r.data),
  getProducts: (params) => apiClient.get('/products', { params }).then((r) => r.data),
  getProduct: (id) => apiClient.get(`/products/${id}`).then((r) => r.data),
  getCombos: (params) => apiClient.get('/combos', { params }).then((r) => r.data),
  getCombo: (id) => apiClient.get(`/combos/${id}`).then((r) => r.data),
}
