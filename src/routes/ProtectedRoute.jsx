import { Navigate, Outlet, useLocation } from "react-router";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const currentRoute = useLocation().pathname;

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      setIsAuthenticated(data.session);
      setLoading(false);
    };

    getSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && currentRoute !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && currentRoute === "/login") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
