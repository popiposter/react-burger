import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';
import { RootState } from './store';
import { ICounters, TOrder, TRequestStatus } from '../utils/types';

type TOrderState = {
  order: {
    name: string;
    number: number;
  } | null;
  status: TRequestStatus;
  error: string | undefined;
  orderDetails: TOrder | null;
};

export const initialState: TOrderState = {
  order: null,
  status: 'idle',
  error: undefined,
  orderDetails: null,
};

export const postOrder = createAsyncThunk('order/postOrder', async (ingredientsIds: Array<string>) => {
  const response = await StellarBurgersApi.postOrder(ingredientsIds);
  return { name: response.name, number: response.order.number };
});

export const getOrder = createAsyncThunk('order/getOrder', async (orderId: string) => {
  const response = await StellarBurgersApi.getOrder(orderId);
  return response.orders;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.status = 'idle';
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderDetails = action.payload[0];
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

export const selectOrderDetails = (state: RootState) => state.order.orderDetails;

export const getIngredientsCountByIds = (state: RootState) => {
  if (!state.order.orderDetails) {
    return {};
  }

  const counters: ICounters = {};

  state.order.orderDetails.ingredients.forEach((ingredientId) => {
    if (counters[ingredientId]) {
      counters[ingredientId]++;
    } else {
      counters[ingredientId] = 1;
    }
  });

  return counters;
};
