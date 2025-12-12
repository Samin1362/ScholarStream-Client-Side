import React from "react";
import { Link, Outlet, useNavigation } from "react-router";
import Logo from "../components/Logo";
import Loader from "../components/Loader";

const AuthLayout = () => {
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" && <Loader />}
      <Link to="/">
        <Logo></Logo>
      </Link>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
