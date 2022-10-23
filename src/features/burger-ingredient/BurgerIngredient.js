import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-ingredient.module.css';
import { ingredient } from '../../constants/types';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { selectIngredientCountInBurger } from '../burger-constructor/burgerConstructorSlice';

function BurgerIngredient({ item, onIngredientClick }) {
  const handleClick = () => {
    onIngredientClick(item);
  };

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const qtyInBurger = useSelector(selectIngredientCountInBurger(item));

  return (
    <li className={styles.item} onClick={handleClick} ref={ref} style={{ opacity }}>
      {qtyInBurger > 0 && <Counter count={qtyInBurger} size="default" />}

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
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
