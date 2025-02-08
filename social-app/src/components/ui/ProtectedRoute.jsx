import { Outlet, Navigate } from "react-router-dom";
import { useCurrentUser } from "../../features/profile/hooks/useCurrentUser";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated } = useCurrentUser();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShouldRender(true);
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !shouldRender) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
