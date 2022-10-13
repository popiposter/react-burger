import React from 'react';

import { getItemCountInCart } from '../../utils/utils';

import styles from './burger-ingredients-by-type.module.css';
import BurgerIngredient from '../burger-ingredient';
import { ingredients, ingredientType } from '../../utils/types';
import PropTypes from 'prop-types';
import { useBurgerConstructor } from '../../context/burger-constructor-context';

function BurgerIngredientsByType({ ingredients, type, onIngredientClick }) {
  const { burger } = useBurgerConstructor();

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
  onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredientsByType;
