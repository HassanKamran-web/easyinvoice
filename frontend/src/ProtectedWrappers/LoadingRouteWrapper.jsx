import { Navigate } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { useAuth } from "../Context/AuthContext"

const LoadingRouteWrapper = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingScreen loading={loading}/>
  }
  if(user) {
    return <Navigate to="/dashboard" replace />
  }


  return children
}

export default LoadingRouteWrapper