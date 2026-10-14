// Persists the session returned by POST /auth/login.
// localStorage keeps the user signed in across tabs and reloads.
const ACCESS_KEY = 'sbpc.accessToken'
const REFRESH_KEY = 'sbpc.refreshToken'
const USER_KEY = 'sbpc.user'

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem(ACCESS_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_KEY),
  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY))
    } catch {
      return null
    }
  },

  setAccessToken: (token) => localStorage.setItem(ACCESS_KEY, token),

  setSession({ accessToken, refreshToken, user }) {
    localStorage.setItem(ACCESS_KEY, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken)
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),

  clear() {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
