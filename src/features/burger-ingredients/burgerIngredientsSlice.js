import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StellarBurgersApi from '../../app/services/StellarBurgersApi';

const initialState = {
  ingredients: [],
  status: 'idle',
  error: null,
  selectedIngredient: null,
};

export const fetchIngredients = createAsyncThunk('burger-ingredients/fetchIngredients', async () => {
  const response = await StellarBurgersApi.getIngredients();
  return response.data;
});

export const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
  },
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

export const selectAllIngredients = (state) => state.ingredients.ingredients;
export const selectIngredientsStatus = (state) => state.ingredients.status;
export const selectIngredientsError = (state) => state.ingredients.error;

export const selectIngredientsByType = (type) => (state) => {
  return state.ingredients.ingredients.filter((ingredient) => ingredient.type === type);
};

export const selectSelectedIngredient = (state) => state.ingredients.selectedIngredient;
