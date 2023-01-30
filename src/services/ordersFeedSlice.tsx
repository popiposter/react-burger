import { TOrder, TOrderResponse, WebsocketStatus } from '../utils/types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface IOrdersFeedState {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  status: WebsocketStatus;
  error: string | null;
}

export const initialState: IOrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: WebsocketStatus.OFFLINE,
  error: null,
};

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {
    wsConnecting: (state) => {
      state.status = WebsocketStatus.CONNECTING;
    },
    wsConnected: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.error = null;
    },
    wsDisconnected: (state) => {
      state.status = WebsocketStatus.OFFLINE;
      state.error = null;
    },
    wsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    wsMessage: (state, action: PayloadAction<TOrderResponse>) => {
      const { orders, total, totalToday } = action.payload;
      state.orders = orders.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
      state.total = total;
      state.totalToday = totalToday;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    },
  },
});

export const connect = createAction<string, 'WS_CONNECT'>('WS_CONNECT');
export const disconnect = createAction('WS_DISCONNECT');

export const { wsConnecting, wsConnected, wsDisconnected, wsError, wsMessage, clearOrders } = ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;

export const selectWsStatus = (state: RootState) => state.ordersFeed.status;
export const selectWsError = (state: RootState) => state.ordersFeed.error;
export const selectWsOrders = (state: RootState) => state.ordersFeed.orders;

export const selectWsTotal = (state: RootState) => state.ordersFeed.total;
export const selectWsTotalToday = (state: RootState) => state.ordersFeed.totalToday;

export const selectWsDoneOrders = (state: RootState) => {
  if (!state.ordersFeed.orders) {
    return [];
  }

  return state.ordersFeed.orders.filter((order) => order.status === 'done');
};

export const selectWsPendingOrders = (state: RootState) => {
  if (!state.ordersFeed.orders) {
    return [];
  }

  return state.ordersFeed.orders.filter((order) => order.status === 'pending');
};

export const selectWsDoneOrdersByChunks = (state: RootState) => {
  const doneOrders = selectWsDoneOrders(state);

  return getOrdersChunks(doneOrders, 10);
};

export const selectWsPendingOrdersByChunks = (state: RootState) => {
  const pendingOrders = selectWsPendingOrders(state);

  return getOrdersChunks(pendingOrders, 10);
};

const getOrdersChunks = (orders: Array<TOrder>, chunkSize: number) => {
  const chunks: Array<Array<TOrder>> = [];

  for (let i = 0; i < orders.length; i += chunkSize) {
    chunks.push(orders.slice(i, i + chunkSize));
  }
  return chunks;
};
