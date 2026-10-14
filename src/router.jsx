import { createBrowserRouter } from 'react-router'
import { RequireAuth } from './auth/RequireAuth'
import { ROLES } from './auth/roles'
import { PlaceholderPage } from './components/PlaceholderPage'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { MainLayout } from './layouts/MainLayout'
import { StatusPage } from './pages/StatusPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage'
import { HomePage } from './pages/shop/HomePage'

// Routes follow the "URL liên quan" column of SmartBuildPC_API_List.
// Swap each `todo(...)` for the real page component as it gets built.
const todo = (title, apis) => <PlaceholderPage title={title} apis={apis} />

const { CUSTOMER, STAFF, ADMIN } = ROLES

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/products', element: todo('Linh kiện', ['GET /categories', 'GET /products']) },
      {
        path: '/products/:id',
        element: todo('Chi tiết sản phẩm', ['GET /products/{id}', 'GET /products/{id}/reviews', 'POST /cart/items']),
      },
      { path: '/combos', element: todo('Combo PC', ['GET /combos', 'POST /cart/items']) },
      { path: '/combos/:id', element: todo('Chi tiết combo', ['GET /combos/{id}']) },

      {
        element: <RequireAuth />,
        children: [
          {
            path: '/profile',
            element: todo('Hồ sơ cá nhân', ['GET /users/me', 'PUT /users/me', 'PUT /users/me/password']),
          },
        ],
      },
      {
        element: <RequireAuth roles={[CUSTOMER]} />,
        children: [
          {
            path: '/ai-builder',
            element: todo('AI PC Builder', [
              'POST /ai-builder/build',
              'POST /ai-builder/validate',
              'POST /ai-builder/builds/{buildId}/add-to-cart',
            ]),
          },
          {
            path: '/cart',
            element: todo('Giỏ hàng', [
              'GET /cart',
              'PUT /cart/items/{cartItemId}',
              'DELETE /cart/items/{cartItemId}',
              'POST /cart/coupon',
              'DELETE /cart/coupon',
            ]),
          },
          { path: '/checkout', element: todo('Thanh toán', ['GET /addresses', 'POST /orders/checkout']) },
          { path: '/checkout/result', element: todo('Kết quả thanh toán', ['POST /payments']) },
          { path: '/orders', element: todo('Đơn hàng của tôi', ['GET /orders/my']) },
          {
            path: '/orders/:id',
            element: todo('Chi tiết đơn hàng', [
              'GET /orders/{id}',
              'PATCH /orders/{id}/cancel',
              'POST /products/{id}/reviews',
            ]),
          },
          {
            path: '/account/addresses',
            element: todo('Sổ địa chỉ', ['GET /addresses', 'POST /addresses', 'PUT /addresses/{id}', 'DELETE /addresses/{id}']),
          },
        ],
      },

      { path: '/403', element: <StatusPage code="403" title="Không có quyền truy cập" text="Tài khoản của bạn không được phép xem trang này." /> },
      { path: '*', element: <StatusPage code="404" title="Không tìm thấy trang" text="Trang bạn tìm không tồn tại hoặc đã bị di chuyển." /> },
    ],
  },
  {
    element: <RequireAuth roles={[STAFF, ADMIN]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/staff/orders', element: todo('Quản lý đơn hàng', ['GET /staff/orders']) },
          {
            path: '/staff/orders/:id',
            element: todo('Chi tiết đơn hàng', ['GET /staff/orders/{id}', 'PATCH /staff/orders/{id}/status']),
          },
          {
            path: '/staff/inventory',
            element: todo('Tồn kho', ['GET /staff/inventory', 'POST /staff/inventory/{productId}/adjust']),
          },

          {
            element: <RequireAuth roles={[ADMIN]} />,
            children: [
              { path: '/admin/dashboard', element: todo('Dashboard doanh thu', ['GET /admin/dashboard/revenue']) },
              {
                path: '/admin/categories',
                element: todo('Danh mục', ['GET /categories', 'POST /admin/categories', 'PUT /admin/categories/{id}', 'DELETE /admin/categories/{id}']),
              },
              {
                path: '/admin/products',
                element: todo('Sản phẩm', [
                  'GET /admin/products',
                  'POST /admin/products',
                  'PUT /admin/products/{id}',
                  'DELETE /admin/products/{id}',
                  'POST /media/upload',
                ]),
              },
              { path: '/admin/combos', element: todo('Combo', ['GET /admin/combos', 'POST /admin/combos', 'DELETE /admin/combos/{id}']) },
              { path: '/admin/combos/:id', element: todo('Chi tiết combo', ['GET /admin/combos/{id}', 'PUT /admin/combos/{id}']) },
              { path: '/admin/datasets', element: todo('Import dataset linh kiện', ['POST /admin/datasets/import']) },
              {
                path: '/admin/compatibility-rules',
                element: todo('Quy tắc tương thích', ['GET /admin/compatibility-rules', 'PUT /admin/compatibility-rules/{id}']),
              },
              {
                path: '/admin/coupons',
                element: todo('Mã giảm giá', ['GET /admin/coupons', 'POST /admin/coupons', 'PATCH /admin/coupons/{id}/status']),
              },
              {
                path: '/admin/users',
                element: todo('Tài khoản', [
                  'GET /admin/users',
                  'POST /admin/users',
                  'PATCH /admin/users/{id}/role',
                  'PATCH /admin/users/{id}/status',
                ]),
              },
              { path: '/admin/audit-logs', element: todo('Nhật ký thao tác', ['GET /admin/audit-logs']) },
            ],
          },
        ],
      },
    ],
  },
])
