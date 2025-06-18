import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import {
  BalanceUpdateDTO,
  CurrencyConversionDTO,
  CustomerAccountDTO,
} from "../../data/dtos/CustomerAccount.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/accounts`;

export const CreateAccountAction = createAsyncThunk(
  "accounts/create",
  async (CustomerAccountDTO: CustomerAccountDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: CustomerAccountDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateBalanceAction = createAsyncThunk(
  "accounts/updateBalance",
  async (
    data: { accountId: string; BalanceUpdateDTO: BalanceUpdateDTO },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${data.accountId}/balance`,
        Method: "PUT",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: data.BalanceUpdateDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const GetBalanceAction = createAsyncThunk(
  "accounts/getBalance",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${accountId}/balance`,
        Method: "GET",
        Headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const CloseAccountAction = createAsyncThunk(
  "accounts/closeAccount",
  async (accountId: string, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${accountId}`,
        Method: "DELETE",
        Headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const ConvertCurrencyAction = createAsyncThunk(
  "accounts/convertCurrency",
  async (
    data: { accountId: string; CurrencyConversionDTO: CurrencyConversionDTO },
    { rejectWithValue }
  ) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${data.accountId}/convert`,
        Method: "PUT",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: data.CurrencyConversionDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const GetIbansAction = createAsyncThunk(
  "accounts/my-ibans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/my-ibans`,
        Method: "GET",
        Headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
