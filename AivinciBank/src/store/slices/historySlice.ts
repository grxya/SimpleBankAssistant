import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetAccountHistoryAction,
  GetIncomeHistoryAction,
  GetLoanHistoryAction,
  GetTransferHistoryAction,
} from "../actions/historyAction";

const initialState: any = {
  isLoading: false,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetTransferHistoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetTransferHistoryAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetTransferHistoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetIncomeHistoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetIncomeHistoryAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetIncomeHistoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetAccountHistoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAccountHistoryAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetAccountHistoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetLoanHistoryAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetLoanHistoryAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetLoanHistoryAction.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setIsLoading } = historySlice.actions;
export default historySlice.reducer;
