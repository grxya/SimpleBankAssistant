import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CloseAccountAction,
  ConvertCurrencyAction,
  CreateAccountAction,
  GetBalanceAction,
  GetIbansAction,
  UpdateBalanceAction,
} from "../actions/customerAccountAction";
import { CustomerAccount, LoadingKey } from "../../data/models/CustomerAccount.model";

const initialState: CustomerAccount = {
  loading: {
    create: false,
    update: false,
    getBalance: false,
    close: false,
    convert: false,
    getIbans: false,
  },
    AccountsInfo: [],
};

const customerAccountSlice = createSlice({
  name: "customerAccount",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ key: LoadingKey; value: boolean }>) => {
      state.loading[action.payload.key] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateAccountAction.pending, (state) => {
      state.loading.create = true;
    });
    builder.addCase(CreateAccountAction.rejected, (state) => {
      state.loading.create = false;
    });
    builder.addCase(CreateAccountAction.fulfilled, (state) => {
      state.loading.create = false;
    });
    builder.addCase(UpdateBalanceAction.pending, (state) => {
      state.loading.update = true;
    });
    builder.addCase(UpdateBalanceAction.rejected, (state) => {
      state.loading.update = false;
    });
    builder.addCase(UpdateBalanceAction.fulfilled, (state) => {
      state.loading.update = false;
    });
    builder.addCase(GetBalanceAction.pending, (state) => {
      state.loading.getBalance = true;
    });
    builder.addCase(GetBalanceAction.rejected, (state) => {
      state.loading.getBalance = false;
    });
    builder.addCase(GetBalanceAction.fulfilled, (state) => {
      state.loading.getBalance = false;
    });
    builder.addCase(CloseAccountAction.pending, (state) => {
      state.loading.close = true;
    });
    builder.addCase(CloseAccountAction.rejected, (state) => {
      state.loading.close = false;
    });
    builder.addCase(CloseAccountAction.fulfilled, (state) => {
      state.loading.close = false;
    });
    builder.addCase(ConvertCurrencyAction.pending, (state) => {
      state.loading.convert = true;
    });
    builder.addCase(ConvertCurrencyAction.rejected, (state) => {
      state.loading.convert = false;
    });
    builder.addCase(ConvertCurrencyAction.fulfilled, (state) => {
      state.loading.convert = false;
    });
    builder.addCase(GetIbansAction.pending, (state) => {
      state.loading.getIbans = true;
    });
    builder.addCase(GetIbansAction.rejected, (state) => {
      state.loading.getIbans = false;
    });
    builder.addCase(GetIbansAction.fulfilled, (state, action: any) => {
      state.loading.getIbans = false;

      state.AccountsInfo = action.payload.map((account: any) => ({
        customerId: account.customerId,
        iban: account.iban || "",
        currency: account.currency || "",
      }));
    });
  },
});

export const { setLoading } = customerAccountSlice.actions;
export default customerAccountSlice.reducer;
