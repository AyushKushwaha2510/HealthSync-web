import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user.type';

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: string | null;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
      state.success = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action:PayloadAction<string |null>){
      state.error = action.payload;
    },
    setSuccess(state, action:PayloadAction<string |null>){
      state.success = action.payload;
    }
  },
});

export const { setUser, logout, setLoading, setError, setSuccess } = authSlice.actions;
export default authSlice.reducer;
