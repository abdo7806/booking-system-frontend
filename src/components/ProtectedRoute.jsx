// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../utils/auth";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  if (role && !hasRole(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;