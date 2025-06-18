import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, user } = useSelector((state) => state.auth)

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/404" replace />

  return <>{children}</>
}

export default ProtectedRoute
