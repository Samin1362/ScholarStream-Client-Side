import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const ModeratorRoute = ({children}) => {

  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader></Loader>;
  }

  if (role.role !== "moderator") {
    return (
      <div>
        <h1>Access is Forbidden.</h1>
      </div>
    );
  }

  return children;
};

export default ModeratorRoute;