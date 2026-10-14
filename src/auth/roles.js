// Role names as stored in the database (see "Hướng dẫn" sheet).
export const ROLES = {
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
  ADMIN: 'ADMIN',
}

// Where each role lands after logging in.
export const HOME_BY_ROLE = {
  [ROLES.CUSTOMER]: '/',
  [ROLES.STAFF]: '/staff/orders',
  [ROLES.ADMIN]: '/admin/dashboard',
}

export const homeForRole = (role) => HOME_BY_ROLE[role] ?? '/'
