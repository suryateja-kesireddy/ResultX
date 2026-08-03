import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Not logged in
  if (!isAuthenticated) {
    if (role === "ADMIN") {
      return <Navigate to="/admin/login" replace />;
    }

    if (role === "HOD") {
      return <Navigate to="/hod/login" replace />;
    }

    if (role === "EXAM_CELL") {
      return <Navigate to="/examcell/login" replace />;
    }

    return <Navigate to="/student/login" replace />;
  }

  // Logged in but wrong role
  // Logged in but wrong role
if (role && user?.role !== role) {

  if (role === "ADMIN") {
    return <Navigate to="/admin/login" replace />;
  }

  if (role === "HOD") {
    return <Navigate to="/hod/login" replace />;
  }

  if (role === "EXAM_CELL") {
    return <Navigate to="/examcell/login" replace />;
  }

  return <Navigate to="/student/login" replace />;
}

  return children;
}

export default ProtectedRoute;