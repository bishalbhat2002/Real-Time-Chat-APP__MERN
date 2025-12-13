
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, screenLoading } = useSelector(
    (state) => state.userReducer
  );

    if(!screenLoading && !isAuthenticated){
      return <Navigate to="/login" replace />;
    }
    
    return children;

};

export default ProtectedRoute;
