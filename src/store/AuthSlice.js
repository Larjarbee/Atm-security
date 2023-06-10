import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    amount: 0,
    faceId: '',
    enteredWithdrawalAmount: 0,
    enteredDepositAmount: 0,
  },
  reducers: {
    balance(state, action) {
      state.amount = action.payload;
    },
    enteredWithdrawalAmount(state, action) {
      state.enteredWithdrawalAmount = +action.payload;
    },
    enteredDepositAmount(state, action) {
      state.enteredDepositAmount = +action.payload;
    },
    deductBalance(state, action) {
      state.amount = state.amount - +action.payload;
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
