import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApplyForLoanAction,
  GetLoanDebtAction,
  GetLoanHistoryAction,
  GetTotalLoanDebtAction,
} from "../actions/loanAction";

const initialState: any = {
  isLoading: false,
  isLoadingApply: false,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoadingApply: (state, action: PayloadAction<boolean>) => {
      state.isLoadingApply = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ApplyForLoanAction.pending, (state) => {
      state.isLoadingApply = true;
    });
    builder.addCase(ApplyForLoanAction.rejected, (state) => {
      state.isLoadingApply = false;
    });
    builder.addCase(ApplyForLoanAction.fulfilled, (state) => {
      state.isLoadingApply = false;
    });
    builder.addCase(GetTotalLoanDebtAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetTotalLoanDebtAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetTotalLoanDebtAction.fulfilled, (state) => {
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
    builder.addCase(GetLoanDebtAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetLoanDebtAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(GetLoanDebtAction.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});
export const { setIsLoading, setIsLoadingApply } = loanSlice.actions;
export default loanSlice.reducer;
