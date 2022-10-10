import React from 'react';

import { getItemCountInCart } from '../../utils';

import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient';
import { burger, ingredients, ingredientType } from '../../types';
import PropTypes from 'prop-types';

function BurgerIngredientsByType({ ingredients, type, burger, onIngredientClick }) {
  return (
    <>
      <h2 className="text text_type_main-medium">{type.title}</h2>

      <ul className={`${styles.list} pt-6 pl-4`}>
        {ingredients.filter((item) => item.type === type.name).map((item) => (
          <BurgerIngredient
            key={item._id} item={item} cartCount={getItemCountInCart(burger, item)}
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
  burger: burger.isRequired,
  onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredientsByType;
