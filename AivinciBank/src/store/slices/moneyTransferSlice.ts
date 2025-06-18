import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitiateTransferAction,
  VerifyOtpAction,
} from "../actions/moneyTransferAction";

const initialState: any = {
  isLoading: false,
};

const moneyTransferSlice = createSlice({
  name: "moneyTransfer",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(InitiateTransferAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(InitiateTransferAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(InitiateTransferAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(VerifyOtpAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(VerifyOtpAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(VerifyOtpAction.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});
export const { setIsLoading } = moneyTransferSlice.actions;
export default moneyTransferSlice.reducer;
