import { apiClient } from './client'

// Section 1 "Xác thực & Tài khoản" of SmartBuildPC_API_List.
export const authApi = {
  register: (body) => apiClient.post('/auth/register', body).then((r) => r.data),
  login: (body) => apiClient.post('/auth/login', body).then((r) => r.data),
  forgotPassword: (email) =>
    apiClient.post('/auth/forgot-password', { email }).then((r) => r.data),
  resetPassword: (token, newPassword) =>
    apiClient.post('/auth/reset-password', { token, newPassword }).then((r) => r.data),
  logout: (refreshToken) =>
    apiClient.post('/auth/logout', { refreshToken }).then((r) => r.data),

  getMe: () => apiClient.get('/users/me').then((r) => r.data),
  updateMe: (body) => apiClient.put('/users/me', body).then((r) => r.data),
  changePassword: (body) => apiClient.put('/users/me/password', body).then((r) => r.data),
}
