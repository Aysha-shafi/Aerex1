import { Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
  return localStorage.getItem("aerex_admin_token") ? children : <Navigate to="/admin/login" replace />;
}
