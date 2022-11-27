import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';
import { TYPE_INGREDIENTS } from '../utils/constants';
import { TIngredient, TRequestStatus } from '../utils/types';
import { RootState } from './store';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  status: TRequestStatus;
  error: string | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  status: 'idle',
  error: undefined,
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

export default burgerIngredientsSlice.reducer;

export const selectIngredients = (state: RootState) => state.ingredients.ingredients;
export const selectIngredientsStatus = (state: RootState) => state.ingredients.status;
export const selectIngredientsError = (state: RootState) => state.ingredients.error;

export const selectIngredientById = (id: string) => (state: RootState) => {
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
