import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CloseAccountAction, ConvertCurrencyAction, CreateAccountAction, GetBalanceAction, UpdateBalanceAction } from "../actions/customerAccountAction";

const initialState: any = {};

const customerAccountSlice = createSlice({
  name: "customerAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateAccountAction.fulfilled, (state, action: any) => {});
    builder.addCase(UpdateBalanceAction.fulfilled, (state, action: any) => {});
    builder.addCase(GetBalanceAction.fulfilled, (state, action: any) => {});
    builder.addCase(CloseAccountAction.fulfilled, (state, action: any) => {});
    builder.addCase(ConvertCurrencyAction.fulfilled, (state, action: any) => {});
  },
});

export default customerAccountSlice.reducer;
