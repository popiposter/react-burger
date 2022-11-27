import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';
import { RootState } from './store';
import { TRequestStatus } from '../utils/types';

type TOrderState = {
  order: {
    name: string;
    number: number;
  } | null;
  status: TRequestStatus;
  error: string | undefined;
};

const initialState: TOrderState = {
  order: null,
  status: 'idle',
  error: undefined,
};

export const postOrder = createAsyncThunk('order/postOrder', async (ingredientsIds: Array<string>) => {
  const response = await StellarBurgersApi.order(ingredientsIds);
  return { name: response.name, number: response.order.number };
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
      });
  },
});

export default orderSlice.reducer;

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;
