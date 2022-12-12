import { StringDictionary } from './types';

export const TYPE_INGREDIENTS = {
  bun: {
    name: 'bun',
    title: 'Булки',
  },
  sauce: {
    name: 'sauce',
    title: 'Соусы',
  },
  main: {
    name: 'main',
    title: 'Начинки',
  },
};

export const OrderStatus: StringDictionary = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
};

export const DRAGGABLE_TYPE = {
  ingredient: 'ingredient',
  constructorIngredient: 'constructorIngredient',
};

export const MAX_INGREDIENTS_COUNT_IN_STACK = 6;
