import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StellarBurgersApi from './StellarBurgersApi';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  message: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  if (!localStorage.getItem('refreshToken')) {
    return null;
  }

  const response = await StellarBurgersApi.getUser();
  return response.user;
});

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  const response = await StellarBurgersApi.updateUser(data);
  return response.user;
});

export const register = createAsyncThunk('user/register', async (data) => {
  const response = await StellarBurgersApi.register(data);
  if (response.success) {
    const { accessToken, refreshToken } = response;
    StellarBurgersApi.saveTokens(refreshToken, accessToken);
  }
  return response;
});

export const login = createAsyncThunk('user/login', async (data) => {
  const response = await StellarBurgersApi.login(data);
  if (response.success) {
    const { accessToken, refreshToken } = response;
    StellarBurgersApi.saveTokens(refreshToken, accessToken);
  }
  return response;
});

export const logout = createAsyncThunk('user/logout', async () => {
  const response = await StellarBurgersApi.logout();
  if (response.success) {
    StellarBurgersApi.deleteTokens();
  }
  return response;
});

export const resetPassword = createAsyncThunk('user/resetPassword', async (data) => {
  return await StellarBurgersApi.resetPassword(data);
});

export const forgotPassword = createAsyncThunk('user/forgotPassword', async (data) => {
  return await StellarBurgersApi.forgotPassword(data);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;

export const { clearError, clearMessage } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUserRequestStatus = (state) => state.auth.status;
export const selectUserRequestError = (state) => state.auth.error;
export const selectUserRequestMessage = (state) => state.auth.message;
