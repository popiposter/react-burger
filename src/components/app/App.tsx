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
import { fetchIngredients } from '../../services/burgerIngredientsSlice';
import IngredientDetails from '../ingredient-details';
import IngredientDetailsModal from '../ingredient-details-modal';
import DetailsContainer from '../../ui/details-container';
import { fetchUser } from '../../services/authSlice';
import { useAppDispatch } from '../../services/store';
import OrdersFeedPage from '../../pages/orders-feed';
import OrderInfo from '../order-info';
import OrderInfoModal from '../order-info-modal';
import { TLocationState } from '../../utils/types';

function App() {
  const dispatch = useAppDispatch();

  const ModalSwitch = () => {
    const location = useLocation<TLocationState>();
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

          <ProtectedRoute path="/profile/orders/:id" exact>
            <DetailsContainer>
              <OrderInfo />
            </DetailsContainer>
          </ProtectedRoute>

          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>

          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/feed" exact>
            <OrdersFeedPage />
          </Route>

          <Route path="/feed/:id" exact>
            <DetailsContainer>
              <OrderInfo />
            </DetailsContainer>
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

        {background && <Route path="/feed/:id" exact children={<OrderInfoModal onClose={handleModalClose} />} />}

        {background && (
          <Route path="/profile/orders/:id" exact children={<OrderInfoModal onClose={handleModalClose} />} />
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
