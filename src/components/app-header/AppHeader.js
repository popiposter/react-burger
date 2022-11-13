import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import NavLink from '../../ui/NavLink';

import styles from './app-header.module.css';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header__container} pt-2 pb-2`}>
        <nav className={`${styles.nav}`}>
          <ul className={styles.nav__list}>
            <li className="pl-4 pr-4 pt-2 pb-2">
              <NavLink
                to="/"
                exact
                className={`${styles.nav__link} text_color_inactive`}
                activeClassName={styles.nav__link_active}
              >
                {({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default pl-2">Конструктор</p>
                  </>
                )}
              </NavLink>
            </li>

            <li className="pl-4 pr-4 pt-2 pb-2">
              <NavLink
                to="/feed"
                exact
                className={`${styles.nav__link} text_color_inactive`}
                activeClassName={styles.nav__link_active}
              >
                {({ isActive }) => (
                  <>
                    <ListIcon type={isActive ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default pl-2">Лента заказов</p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link to="/">
          <Logo />
        </Link>

        <nav className={`${styles.nav} ${styles.right}`}>
          <ul className={styles.nav__list}>
            <li className="pl-4 pr-4 pt-2 pb-2">
              <NavLink
                to="/profile"
                exact
                className={`${styles.nav__link} text_color_inactive`}
                activeClassName={styles.nav__link_active}
              >
                {({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                    <p className="text text_type_main-default pl-2">Личный кабинет</p>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
