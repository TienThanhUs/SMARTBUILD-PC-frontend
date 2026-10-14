import { useCallback, useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/auth'
import { SESSION_EXPIRED_EVENT } from '../api/client'
import { tokenStorage } from '../api/tokenStorage'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    tokenStorage.getAccessToken() ? tokenStorage.getUser() : null,
  )

  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [])

  const login = useCallback(async (credentials) => {
    const session = await authApi.login(credentials)
    tokenStorage.setSession(session)
    setUser(session.user)
    return session.user
  }, [])

  const logout = useCallback(async () => {
    const refreshToken = tokenStorage.getRefreshToken()
    tokenStorage.clear()
    setUser(null)
    // Backend is stateless; revoking the refresh token is best-effort.
    if (refreshToken) await authApi.logout(refreshToken).catch(() => {})
  }, [])

  const updateUser = useCallback((next) => {
    tokenStorage.setUser(next)
    setUser(next)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      hasRole: (...roles) => Boolean(user) && roles.includes(user.role),
      login,
      logout,
      updateUser,
    }),
    [user, login, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
