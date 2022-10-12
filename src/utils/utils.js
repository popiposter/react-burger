import { TYPE_INGREDIENTS } from './constants';

export const getItemCountInCart = (burger, item) => {
  if (item.type === TYPE_INGREDIENTS.bun.name) {
    return burger.bun === item ? 2 : 0;
  } else {
    return burger.ingredients.filter((cartItem) => cartItem._id === item._id).length;
  }
}

export const getOrderSum = (burger) => {
  let sum = burger.bun ? burger.bun.price * 2 : 0;

  burger.ingredients.forEach((ingredient) => {
    sum += ingredient.price;
  });

  return sum;
}

export const getIngredientsIds = (burger) => {
  const ingredientsIds = [];

  if (burger.bun) {
    ingredientsIds.push(burger.bun._id);
  }

  burger.ingredients.forEach((item) => {
    ingredientsIds.push(item._id);
  });

  return ingredientsIds;
}
