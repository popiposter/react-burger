import PropTypes from 'prop-types';

export const ingredient = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const ingredients = PropTypes.arrayOf(ingredient);

export const burger = PropTypes.shape({
  bun: ingredient,
  ingredients: ingredients.isRequired
});

export const order = PropTypes.shape({
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
});

export const ingredientType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
});

