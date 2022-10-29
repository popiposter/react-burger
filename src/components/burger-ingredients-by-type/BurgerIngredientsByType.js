import React from 'react';

import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient';
import { ingredients, ingredientType } from '../../constants/types';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIngredientsCounters } from '../../services/burgerConstructorSlice';

function BurgerIngredientsByType({ ingredients, type, onIngredientClick }) {
  const counters = useSelector(selectIngredientsCounters);

  return (
    <>
      <h2 className="text text_type_main-medium">{type.title}</h2>

      <ul className={`${styles.list} pt-6 pl-4`}>
        {ingredients.map((item) => (
          <BurgerIngredient
            key={item._id}
            item={item}
            count={counters[item._id]}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </ul>
    </>
  );
}

BurgerIngredientsByType.propTypes = {
  ingredients: ingredients.isRequired,
  type: ingredientType.isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsByType;
