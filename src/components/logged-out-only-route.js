import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectUserRequestStatus } from '../services/authSlice';
import Container from '../ui/container';
import Spinner from '../ui/spinner';
import PropTypes from 'prop-types';

export function LoggedOutOnlyRoute({ children, ...rest }) {
  const user = useSelector(selectUser);
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const history = useHistory();
  const { from } = history.location?.state || { from: { pathname: '/' } };

  if (userRequestStatus === 'loading') {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  return (
    <Route
      {...rest}
      render={() => {
        return !user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: from.pathname,
            }}
          />
        );
      }}
    />
  );
}

LoggedOutOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
