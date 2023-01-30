import { createSlice, nanoid, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { TYPE_INGREDIENTS } from '../utils/constants';
import { RootState } from './store';
import { ICounters, TConstructorIngredient } from '../utils/types';

export interface IBurgerConstructorState {
  burger: {
    bun: TConstructorIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
}

export const initialState: IBurgerConstructorState = {
  burger: {
    bun: null,
    ingredients: [],
  },
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        if (action.payload.type === TYPE_INGREDIENTS.bun.name) {
          state.burger.bun = action.payload;
        } else {
          state.burger.ingredients.push(action.payload);
        }
      },
      prepare(ingredient) {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id,
          },
        };
      },
    },
    removeIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === TYPE_INGREDIENTS.bun.name) {
        state.burger.bun = null;
      } else {
        state.burger.ingredients = state.burger.ingredients.filter((ingredient) => ingredient.id !== action.payload.id);
      }
    },
    moveIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;

      const draggedItem = state.burger.ingredients[fromIndex];

      state.burger.ingredients.splice(fromIndex, 1);
      state.burger.ingredients.splice(toIndex, 0, draggedItem);
    },
    resetBurger: (state) => {
      state.burger = initialState.burger;
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, resetBurger } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectBun = (state: RootState) => state.burgerConstructor.burger.bun;
export const selectIngredients = (state: RootState) => state.burgerConstructor.burger.ingredients;

export const selectIngredientsIds = createSelector(selectBun, selectIngredients, (bun, ingredients) => {
  const ingredientsIds = [];

  ingredients.forEach((item) => {
    ingredientsIds.push(item._id);
  });

  if (bun) {
    ingredientsIds.unshift(bun._id);
    ingredientsIds.push(bun._id);
  }

  return ingredientsIds;
});

export const selectIngredientsCounters = createSelector(selectBun, selectIngredients, (bun, ingredients) => {
  const counters: ICounters = {};

  ingredients.forEach((ingredient) => {
    if (!counters[ingredient._id]) {
      counters[ingredient._id] = 0;
    }

    counters[ingredient._id]++;
  });

  if (bun) {
    counters[bun._id] = 2;
  }

  return counters;
});

export const selectTotalPrice = createSelector(selectBun, selectIngredients, (bun, ingredients) => {
  let sum = bun ? bun.price * 2 : 0;

  ingredients.forEach((ingredient) => {
    sum += ingredient.price;
  });

  return sum;
});
