import React, { FC } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser, selectUserRequestStatus } from '../services/authSlice';
import Container from '../ui/container';
import Spinner from '../ui/spinner';
import { IPropsWithChildren } from '../utils/types';

interface ILocationState {
  from: {
    pathname: string;
  };
}

interface IProtectedRouteProps extends IPropsWithChildren {
  path: string;
  exact?: boolean;
}

export const LoggedOutOnlyRoute: FC<IProtectedRouteProps> = ({ children, ...rest }) => {
  const user = useSelector(selectUser);
  const userRequestStatus = useSelector(selectUserRequestStatus);

  const location = useLocation<ILocationState>();
  const { from } = location?.state || { from: { pathname: '/' } };

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
};
