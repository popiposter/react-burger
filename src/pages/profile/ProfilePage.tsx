import React from 'react';
import { NavLink, Route, useHistory, useRouteMatch } from 'react-router-dom';

import styles from './profile.module.css';
import Profile from '../../components/profile';
import { logout } from '../../services/authSlice';
import { useAppDispatch } from '../../services/store';

function ProfilePage() {
  const { path, url } = useRouteMatch();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace({ pathname: '/' });
  };

  return (
    <main className={styles.profile}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/profile"
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.linkActive}
              exact
            >
              Профиль
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`${url}/orders`}
              className={`${styles.link} text text_type_main-medium text_color_inactive`}
              activeClassName={styles.linkActive}
              exact
            >
              История заказов
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              className={`${styles.logout} text text_type_main-medium text_color_inactive`}
              onClick={handleLogout}
            >
              Выход
            </button>
          </li>
        </ul>
        <Route path={path} exact>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </Route>
      </nav>
      <section>
        <Route path={path} exact>
          <Profile />
        </Route>

        <Route path={`${path}/orders`} exact>
          <h1 className="text text_type_main-default">История заказов</h1>
        </Route>
      </section>
    </main>
  );
}

export default ProfilePage;
