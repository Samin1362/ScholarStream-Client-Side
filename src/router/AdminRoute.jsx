import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loader from "../components/Loader";
import Login from "../pages/Auth/Login";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (role.role !== "admin") {
    return (
      <div>
        <h1>Access is Forbidden.</h1>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
