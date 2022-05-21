import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const ProtectedRoutes = ({ component, ...props }) => {
  const [authChecked, setAuthCheck] = useState(false);
  const history = useHistory();
  useEffect(() => {
    // set authChecked true if user is signed in else false and redirect to sign in
    if (localStorage.getItem('token')) {
      setAuthCheck(true);
    } else {
      history.push('/signin');
    }
  }, []);

  return <Route {...props} component={authChecked ? component : null} />;
};
