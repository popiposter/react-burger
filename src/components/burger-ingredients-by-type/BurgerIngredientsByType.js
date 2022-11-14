import React from 'react';

import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient';
import { ingredients, ingredientType } from '../../utils/types';
import { useSelector } from 'react-redux';
import { selectIngredientsCounters } from '../../services/burgerConstructorSlice';
import { Link, useLocation } from 'react-router-dom';

function BurgerIngredientsByType({ ingredients, type }) {
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
}

BurgerIngredientsByType.propTypes = {
  ingredients: ingredients.isRequired,
  type: ingredientType.isRequired,
};

export default BurgerIngredientsByType;
