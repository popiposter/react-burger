import { TYPE_INGREDIENTS } from './constants';

export const getItemCountInCart = (burger, item) => {
  if (item.type === TYPE_INGREDIENTS.bun.name) {
    return 1
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
