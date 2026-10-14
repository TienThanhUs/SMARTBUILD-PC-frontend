# SmartBuild PC – Frontend

Giao diện web cho SmartBuild PC: cửa hàng linh kiện, AI PC Builder, giỏ hàng, đơn hàng và khu vực nhân viên / quản trị. Backend là Spring Boot với JWT + Spring Security.

## Công nghệ

- React 19 + Vite 8
- TailwindCSS 4 (plugin `@tailwindcss/vite`, cấu hình theme trong `src/index.css`)
- React Router 8
- Axios
- oxlint

## Chạy dự án

Yêu cầu Node.js 20.19+ (khuyên dùng 22).

```bash
npm install
cp .env.example .env   # chỉnh nếu backend không chạy ở localhost:8080
npm run dev            # http://localhost:5173
```

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy dev server |
| `npm run build` | Build production vào `dist/` |
| `npm run preview` | Xem thử bản build |
| `npm run lint` | Kiểm tra code |

### Kết nối backend

- Mọi API đi qua tiền tố `/api/v1` (theo file *SmartBuildPC_API_List*).
- Khi dev, Vite proxy chuyển `/api` sang `VITE_BACKEND_URL` (mặc định `http://localhost:8080`), nên không cần cấu hình CORS ở Spring Boot.
- Khi build production, đặt `VITE_API_BASE_URL` thành URL đầy đủ của backend, ví dụ `https://api.example.com/api/v1`, và bật CORS cho domain frontend.
- Server host bản build cần trả `index.html` cho mọi đường dẫn (SPA fallback).

## Cấu trúc thư mục

```
src/
  api/          axios client, lưu token, các module gọi API theo nhóm
  auth/         AuthProvider, useAuth, RequireAuth (chặn theo role), roles
  components/   component dùng chung
  layouts/      MainLayout (khách hàng), AuthLayout, DashboardLayout (staff/admin)
  pages/        các trang
  router.jsx    toàn bộ route
```

## Xác thực (JWT)

- `POST /auth/login` trả `accessToken`, `refreshToken`, `user`; được lưu trong `localStorage`.
- Mọi request tự gắn `Authorization: Bearer <accessToken>`.
- Gặp 401, client tự gọi `POST /auth/refresh` một lần (các request song song dùng chung một lần refresh) rồi gửi lại request cũ. Refresh thất bại thì xóa phiên và đưa người dùng về `/login`.
- Sau đăng nhập chuyển trang theo role: CUSTOMER → `/`, STAFF → `/staff/orders`, ADMIN → `/admin/dashboard`.
- `RequireAuth roles={[...]}` chặn route theo role; sai role sẽ về `/403`.

## Trạng thái các trang

Đã làm: đăng nhập, đăng ký, quên mật khẩu, đặt lại mật khẩu, trang chủ.

Các route còn lại đã có sẵn (theo cột *URL liên quan* của file API) nhưng đang hiển thị trang tạm, liệt kê API mà màn hình đó sẽ gọi. Khi làm màn hình mới, tạo component trong `src/pages/...` rồi thay `todo(...)` tương ứng trong `src/router.jsx`.
