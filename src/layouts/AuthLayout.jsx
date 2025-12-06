import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../components/Logo';

const AuthLayout = () => {
  return (
    <div>
      <Logo></Logo>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;