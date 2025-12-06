import React from 'react';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div>
      <h1>This is root.</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;