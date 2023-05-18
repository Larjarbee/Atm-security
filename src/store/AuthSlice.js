import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    amount: 5000,
  },
  reducers: {
    deductBalance(state, action) {
      state.amount = state.amount - action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
