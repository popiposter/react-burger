import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
