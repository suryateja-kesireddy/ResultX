import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  return children;
}

export default ProtectedRoute;