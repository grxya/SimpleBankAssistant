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
      const token = localStorage.getItem("accessToken");
      console.log(token);

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${data.accountId}/balance`,
        Method: "PUT",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${accountId}/balance`,
        Method: "GET",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${accountId}`,
        Method: "DELETE",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${data.accountId}/convert`,
        Method: "PUT",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Data: data.CurrencyConversionDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
