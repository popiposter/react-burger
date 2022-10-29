import React from 'react';
import styles from './ingredient-details.module.css';

import { ingredient } from '../../constants/types';

function IngredientDetails({ ingredient }) {
  return (
    <>
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />

      <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</p>

      <ul className={`${styles.nutrition}`}>
        <li className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
        </li>

        <li className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
        </li>

        <li className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
        </li>

        <li className={styles.nutrition__item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredient.isRequired,
};

export default IngredientDetails;
