import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';

const initialState = {
  order: null,
  orderStatus: 'idle',
  orderError: null,
};

export const postOrder = createAsyncThunk('order/postOrder', async (burger) => {
  const response = await StellarBurgersApi.order(burger);
  return { name: response.name, number: response.order.number };
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.orderStatus = 'idle';
      state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderStatus = 'loading';
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderStatus = 'succeeded';
        state.order = action.payload;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderStatus = 'failed';
        state.orderError = action.error.message;
      });
  },
});

export default orderSlice.reducer;

export const { resetOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.order;
export const selectOrderStatus = (state) => state.order.orderStatus;
export const selectOrderError = (state) => state.order.orderError;
