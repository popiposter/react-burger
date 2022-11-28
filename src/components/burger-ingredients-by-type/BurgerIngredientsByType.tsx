import React, { FC } from 'react';

import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient';
import { useSelector } from 'react-redux';
import { selectIngredientsCounters } from '../../services/burgerConstructorSlice';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TIngredientType } from '../../utils/types';

interface IBurgerIngredientsByTypeProps {
  ingredients: Array<TIngredient>;
  type: TIngredientType;
}

const BurgerIngredientsByType: FC<IBurgerIngredientsByTypeProps> = ({ ingredients, type }) => {
  const counters = useSelector(selectIngredientsCounters);
  const location = useLocation();

  return (
    <>
      <h2 className="text text_type_main-medium">{type.title}</h2>
      <ul className={`${styles.list} pt-6 pl-4`}>
        {ingredients.map((item) => (
          <Link
            className={styles.link}
            key={item._id}
            to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }}
          >
            <BurgerIngredient item={item} count={counters[item._id]} />
          </Link>
        ))}
      </ul>
    </>
  );
};

export default BurgerIngredientsByType;
