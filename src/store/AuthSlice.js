import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    amount: 0,
    faceId: '',
    enteredAmount: 0
  },
  reducers: {
    balance(state, action) {
      state.amount = action.payload;
    },
    enteredAmount(state, action) {
      state.enteredAmount = action.payload;
    },
    deductBalance(state, action) {
      state.amount = state.amount - action.payload;
    },
    increaseBalance(state, action) {
      state.amount = state.amount + +action.payload;
    },
    setFaceId(state, action) {
      state.faceId = action.payload
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
