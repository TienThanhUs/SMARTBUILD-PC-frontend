import axios from 'axios'
import { tokenStorage } from './tokenStorage'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

// Fired when the session can no longer be refreshed; AuthProvider listens
// for it to clear the user and send them to the login page.
export const SESSION_EXPIRED_EVENT = 'sbpc:session-expired'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

apiClient.interceptors.request.use((config) => {
  const token = tokenStorage.getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Endpoints where a 401 means "wrong credentials", not "token expired".
const NO_REFRESH_PATHS = ['/auth/login', '/auth/register', '/auth/refresh']

// One refresh at a time: concurrent 401s wait for the same promise.
let refreshPromise = null

function refreshAccessToken() {
  if (!refreshPromise) {
    const refreshToken = tokenStorage.getRefreshToken()
    refreshPromise = (
      refreshToken
        ? axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken })
        : Promise.reject(new Error('No refresh token'))
    )
      .then(({ data }) => {
        tokenStorage.setAccessToken(data.accessToken)
        return data.accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status
    const canRefresh =
      status === 401 &&
      original &&
      !original._retry &&
      !NO_REFRESH_PATHS.some((path) => original.url?.startsWith(path))

    if (canRefresh) {
      original._retry = true
      try {
        const token = await refreshAccessToken()
        original.headers.Authorization = `Bearer ${token}`
        return apiClient(original)
      } catch {
        tokenStorage.clear()
        window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
      }
    }

    return Promise.reject(toApiError(error))
  },
)

// Normalises axios errors into { status, message, data } so pages can
// show `error.message` without digging into the response shape.
export function toApiError(error) {
  const status = error.response?.status ?? 0
  const data = error.response?.data
  const message =
    data?.message ||
    data?.error ||
    (status === 0 ? 'Không kết nối được tới máy chủ.' : `Yêu cầu thất bại (${status}).`)
  const apiError = new Error(message)
  apiError.status = status
  apiError.data = data
  return apiError
}
