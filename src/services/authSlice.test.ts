import reducer, {
  clearError,
  clearMessage,
  fetchUser,
  forgotPassword,
  initialState,
  login,
  logout,
  register,
  resetPassword,
  TAuthState,
  updateUser,
} from './authSlice';
import { userMock } from '../utils/constants';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle clearError', function () {
    const action = { type: clearError.type };
    const state: TAuthState = {
      ...initialState,
      error: 'error',
    };
    const result = reducer(state, action);

    expect(result).toEqual(initialState);
  });

  it('should handle clearMessage', function () {
    const action = { type: clearMessage.type };
    const state: TAuthState = {
      ...initialState,
      message: 'message',
    };
    const result = reducer(state, action);

    expect(result).toEqual(initialState);
  });

  it('should handle fetchUser pending', function () {
    const action = { type: fetchUser.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle fetchUser fulfilled', function () {
    const action = { type: fetchUser.fulfilled.type, payload: userMock };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      user: action.payload,
    });
  });

  it('should handle fetchUser rejected', function () {
    const action = { type: fetchUser.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle updateUser pending', function () {
    const action = { type: updateUser.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle updateUser fulfilled', function () {
    const action = { type: updateUser.fulfilled.type, payload: userMock };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      user: action.payload,
    });
  });

  it('should handle updateUser rejected', function () {
    const action = { type: updateUser.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle register pending', function () {
    const action = { type: register.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle register fulfilled', function () {
    const action = { type: register.fulfilled.type, payload: { user: userMock } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      user: action.payload.user,
    });
  });

  it('should handle register rejected', function () {
    const action = { type: register.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle logout pending', function () {
    const action = { type: logout.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle logout fulfilled', function () {
    const action = { type: logout.fulfilled.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
    });
  });

  it('should handle logout rejected', function () {
    const action = { type: logout.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle login pending', function () {
    const action = { type: login.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle login fulfilled', function () {
    const action = { type: login.fulfilled.type, payload: { user: userMock } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      user: action.payload.user,
    });
  });

  it('should handle login rejected', function () {
    const action = { type: login.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle resetPassword pending', function () {
    const action = { type: resetPassword.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle resetPassword fulfilled', function () {
    const action = { type: resetPassword.fulfilled.type, payload: { message: 'message' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      message: action.payload.message,
    });
  });

  it('should handle resetPassword rejected', function () {
    const action = { type: resetPassword.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });

  it('should handle forgotPassword pending', function () {
    const action = { type: forgotPassword.pending.type };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'loading',
    });
  });

  it('should handle forgotPassword fulfilled', function () {
    const action = { type: forgotPassword.fulfilled.type, payload: { message: 'message' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'succeeded',
      message: action.payload.message,
    });
  });

  it('should handle forgotPassword rejected', function () {
    const action = { type: forgotPassword.rejected.type, error: { message: 'error' } };
    const result = reducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      status: 'failed',
      error: action.error.message,
    });
  });
});
