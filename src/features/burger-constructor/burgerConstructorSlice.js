import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import StellarBurgersApi from '../../app/services/StellarBurgersApi';
import { TYPE_INGREDIENTS } from '../../constants/constants';

const initialState = {
  burger: {
    bun: null,
    ingredients: [],
  },
  order: null,
  orderStatus: 'idle',
  orderError: null,
};

export const fetchOrder = createAsyncThunk('burgerConstructor/fetchOrder', async (burger) => {
  const response = await StellarBurgersApi.order(burger);
  return { name: response.name, number: response.order.number };
});

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action) {
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
    removeIngredient: (state, action) => {
      if (action.payload.type === TYPE_INGREDIENTS.bun.name) {
        state.burger.bun = null;
      } else {
        state.burger.ingredients = state.burger.ingredients.filter((ingredient) => ingredient.id !== action.payload.id);
      }
    },
    moveIngredient: (state, action) => {
      const { draggedItem, targetItem } = action.payload;
      const draggedItemIndex = state.burger.ingredients.findIndex((ingredient) => ingredient.id === draggedItem.id);
      const targetItemIndex = state.burger.ingredients.findIndex((ingredient) => ingredient.id === targetItem.id);

      state.burger.ingredients.splice(draggedItemIndex, 1);
      state.burger.ingredients.splice(targetItemIndex, 0, draggedItem);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.order = action.payload;
        state.burger = initialState.burger;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderError = action.error.message;
      });
  },
});

export const { addIngredient, removeIngredient, moveIngredient } = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectBurger = (state) => state.burgerConstructor.burger;
export const selectBun = (state) => state.burgerConstructor.burger.bun;
export const selectIngredients = (state) => state.burgerConstructor.burger.ingredients;
export const selectIngredientsIds = (state) => {
  const ingredientsIds = [];

  state.burgerConstructor.burger.ingredients.forEach((item) => {
    ingredientsIds.push(item._id);
  });

  if (state.burgerConstructor.burger.bun) {
    ingredientsIds.unshift(state.burgerConstructor.burger.bun._id);
    ingredientsIds.push(state.burgerConstructor.burger.bun._id);
  }

  return ingredientsIds;
};

export const selectIngredientCountInBurger = (ingredient) => (state) => {
  const { bun, ingredients } = state.burgerConstructor.burger;

  if (ingredient.type === TYPE_INGREDIENTS.bun.name) {
    return bun?._id === ingredient._id ? 2 : 0;
  } else {
    return ingredients.filter((item) => item._id === ingredient._id).length;
  }
};

export const selectTotalPrice = (state) => {
  const { bun, ingredients } = state.burgerConstructor.burger;

  let sum = bun ? bun.price * 2 : 0;

  ingredients.forEach((ingredient) => {
    sum += ingredient.price;
  });

  return sum;
};

export const selectOrder = (state) => state.burgerConstructor.order;
export const selectOrderStatus = (state) => state.burgerConstructor.orderStatus;
export const selectOrderError = (state) => state.burgerConstructor.orderError;
