import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.header__container} pt-2 pb-2`}>
        <nav className={`${styles.nav}`}>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </li>
            <li className={`${styles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
            </li>
          </ul>
        </nav>

        <Logo />

        <nav className={styles.nav}>
          <ul className={styles.nav__list}>
            <li className={`${styles.nav__item} pl-4 pr-4 pt-2 pb-2`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
