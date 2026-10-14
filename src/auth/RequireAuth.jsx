import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from './AuthContext'

// Guards a group of routes. Without `roles`, any signed-in user may pass.
export function RequireAuth({ roles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }
  return <Outlet />
}
