import React, { useContext } from 'react';
import { Navigate, Outlet,useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
//  const loginRedirectPath = '/login';

  // if (!user) {
  //   return <Navigate to={loginRedirectPath} state={{ from: location }} replace />;
  // }
  // if (allowedRoles && !allowedRoles.includes(user.role)) {
  //   return <Navigate to="/" replace />;
  // }

    if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }



  return <Outlet context={{ userName: user.name }} />;
  // return <Outlet />;
};

export default ProtectedRoute;