import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../context/useAuth";

export function PublicOnlyRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
