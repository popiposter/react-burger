import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';
import { TYPE_INGREDIENTS } from '../utils/constants';

const initialState = {
  ingredients: [],
  status: 'idle',
  error: null,
};

export const fetchIngredients = createAsyncThunk('burger-ingredients/fetchIngredients', async () => {
  const response = await StellarBurgersApi.getIngredients();
  return response.data;
});

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectIngredient } = burgerIngredientsSlice.actions;

export default burgerIngredientsSlice.reducer;

export const selectIngredients = (state) => state.ingredients.ingredients;
export const selectIngredientsStatus = (state) => state.ingredients.status;
export const selectIngredientsError = (state) => state.ingredients.error;

export const selectIngredientById = (id) => (state) => {
  return state.ingredients.ingredients.find((ingredient) => ingredient._id === id);
};

export const selectBuns = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === TYPE_INGREDIENTS.bun.name)
);

export const selectSauces = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === TYPE_INGREDIENTS.sauce.name)
);

export const selectMains = createSelector(selectIngredients, (ingredients) =>
  ingredients.filter((ingredient) => ingredient.type === TYPE_INGREDIENTS.main.name)
);
