import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './burgerIngredientsSlice';
import burgerConstructorReducer from './burgerConstructorSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
import ordersFeedReducer from './ordersFeedSlice';
import { useDispatch } from 'react-redux';

import {
  connect as OrdersFeedWsConnect,
  disconnect as OrdersFeedWsDisconnect,
  wsConnecting as OrdersFeedWsConnecting,
  wsConnected as OrdersFeedWsOpen,
  wsDisconnected as OrdersFeedWsClose,
  wsMessage as OrdersFeedWsMessage,
  wsError as OrdersFeedWsError,
} from './ordersFeedSlice';
import { createSocketMiddleware } from './middleware/socket-middleware';

const wsActions = {
  connect: OrdersFeedWsConnect,
  disconnect: OrdersFeedWsDisconnect,
  wsConnecting: OrdersFeedWsConnecting,
  wsConnected: OrdersFeedWsOpen,
  wsDisconnected: OrdersFeedWsClose,
  wsError: OrdersFeedWsError,
  wsMessage: OrdersFeedWsMessage,
};

const websocketMiddleware = createSocketMiddleware(wsActions);

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    auth: authReducer,
    ordersFeed: ordersFeedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
