import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

export const ProtectedRoutes = ({ component, ...props }) => {
  const [authChecked, setAuthCheck] = useState(true);
  useEffect(() => {
    // set authChecked true if user is signed in else false and redirect to sign in
  }, []);

  return <Route {...props} component={authChecked ? component : null} />;
};
