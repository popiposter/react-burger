import reducer, { initialState, getOrder, postOrder } from './orderSlice';
import { orderMock } from '../utils/constants';

describe('orderSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle postOrder.pending', () => {
    const action = { type: postOrder.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle postOrder.fulfilled', () => {
    const action = { type: postOrder.fulfilled.type, payload: orderMock };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      order: action.payload,
    });
  });

  it('should handle postOrder.rejected', () => {
    const action = { type: postOrder.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle getOrder.pending', () => {
    const action = { type: getOrder.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle getOrder.fulfilled', () => {
    const action = { type: getOrder.fulfilled.type, payload: [orderMock] };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      orderDetails: action.payload[0],
    });
  });

  it('should handle getOrder.rejected', () => {
    const action = { type: getOrder.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });
});
