import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateComponent = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const location = useLocation();

  const adminOnlyRoutes = ["/allusers"];
  const isAdminRoute = adminOnlyRoutes.includes(location.pathname);

  console.log("Accessing:", location.pathname, "| Role:", role);

  if (!token) return <Navigate to="/login" replace />;
  if (isAdminRoute && role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateComponent;
