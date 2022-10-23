import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/burger-ingredients/burgerIngredientsSlice';
import burgerConstructorReducer from '../features/burger-constructor/burgerConstructorSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
  },
});
