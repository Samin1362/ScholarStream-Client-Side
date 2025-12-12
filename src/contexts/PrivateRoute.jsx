import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {

  const { user } = useAuth();

  if (user && user?.email) {
    return children;
  }

  return <Navigate to="/login"></Navigate>
};

export default PrivateRoute;
