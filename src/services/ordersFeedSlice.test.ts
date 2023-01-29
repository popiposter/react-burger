import reducer, {
  clearOrders,
  initialState,
  IOrdersFeedState,
  wsConnected,
  wsConnecting,
  wsDisconnected,
  wsError,
  wsMessage,
} from './ordersFeedSlice';
import { WebsocketStatus } from '../utils/types';
import { orderMock } from '../utils/constants';

describe('ordersFeedSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle wsConnecting', () => {
    const action = { type: wsConnecting.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  });

  it('should handle wsConnected', () => {
    const action = { type: wsConnected.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
    });
  });

  it('should handle wsDisconnected', function () {
    const action = { type: wsDisconnected.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  });

  it('should handle wsError', function () {
    const action = { type: wsError.type, payload: 'error' };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: action.payload,
    });
  });

  it('should handle wsMessage', function () {
    const action = { type: wsMessage.type, payload: { orders: [orderMock], total: 100, totalToday: 10 } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      orders: action.payload.orders,
      total: action.payload.total,
      totalToday: action.payload.totalToday,
    });
  });

  it('should handle clearOrders', function () {
    const action = { type: clearOrders.type };
    const state: IOrdersFeedState = {
      ...initialState,
      orders: [orderMock],
      total: 100,
      totalToday: 10,
    };
    const result = reducer(state, action);

    expect(result).toEqual({
      ...initialState,
      orders: [],
      total: 0,
      totalToday: 0,
    });
  });
});
