import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectUserRequestStatus } from '../services/authSlice';
import Spinner from '../ui/spinner';
import Container from '../ui/container';
import PropTypes from 'prop-types';

export function ProtectedRoute({ children, ...rest }) {
  const user = useSelector(selectUser);
  const userRequestStatus = useSelector(selectUserRequestStatus);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return user ? (
          children
        ) : userRequestStatus === 'failed' || userRequestStatus === 'succeeded' ? (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        ) : (
          <Container>
            <Spinner />
          </Container>
        );
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
