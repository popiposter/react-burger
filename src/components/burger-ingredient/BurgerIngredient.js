import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import { ingredient } from '../../types';
import PropTypes from 'prop-types';

function BurgerIngredient({ item, cartCount, onIngredientClick }) {
  const handleClick = () => {
    onIngredientClick(item);
  }

  return (
    <li className={styles.item} onClick={handleClick}>

      {cartCount > 0 && (<Counter count={cartCount} size="default" />)}

      <img src={item.image} alt={item.name} />

      <div className={`${styles.price} pt-2 pb-2`}>
        <p className="text text_type_digits-default pr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </li>
  );
}

BurgerIngredient.propTypes = {
  item: ingredient.isRequired,
  cartCount: PropTypes.number.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
}

export default BurgerIngredient;
