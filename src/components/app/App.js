import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, useHistory } from 'react-router-dom';

import './app.module.css';

import {
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import AppHeader from '../app-header';
import { ProtectedRoute } from '../protected-route';
import { LoggedOutOnlyRoute } from '../logged-out-only-route';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../../services/burgerIngredientsSlice';
import IngredientDetails from '../ingredient-details';
import IngredientDetailsModal from '../ingredient-details-modal';
import DetailsContainer from '../../ui/details-container';
import { fetchUser } from '../../services/authSlice';

function App() {
  const dispatch = useDispatch();

  const ModalSwitch = () => {
    const location = useLocation();
    const history = useHistory();
    let background = location.state?.background;

    const handleModalClose = () => {
      history.goBack();
    };

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <LoggedOutOnlyRoute path="/login" exact>
            <LoginPage />
          </LoggedOutOnlyRoute>

          <LoggedOutOnlyRoute path="/register" exact>
            <RegisterPage />
          </LoggedOutOnlyRoute>

          <LoggedOutOnlyRoute path="/forgot-password" exact>
            <ForgotPasswordPage />
          </LoggedOutOnlyRoute>

          <LoggedOutOnlyRoute path="/reset-password" exact>
            <ResetPasswordPage />
          </LoggedOutOnlyRoute>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/ingredients/:id" exact>
            <DetailsContainer>
              <IngredientDetails />
            </DetailsContainer>
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        {background && (
          <Route path="/ingredients/:id" exact children={<IngredientDetailsModal onClose={handleModalClose} />} />
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
