import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { BalanceUpdateDTO, CurrencyConversionDTO, CustomerAccountnDTO } from "../../data/dtos/CustomerAccount.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/accounts`;

export const CreateAccount = createAsyncThunk(
  "accounts/create",
  async (CustomerAccountnDTO: CustomerAccountnDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: CustomerAccountnDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const UpdateBalance = createAsyncThunk(
    "accounts/updateBalance",
    async (data: { accountId: string; BalanceUpdateDTO: BalanceUpdateDTO }, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${data.accountId}/balance`,
          Method: "PUT",
          Headers: {
            "Content-Type": "application/json",
          },
          Data: data.BalanceUpdateDTO,
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

  export const GetBalance = createAsyncThunk(
    "accounts/getBalance",
    async (accountId: string, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${accountId}/balance`,
          Method: "GET",
          Headers: {
            "Content-Type": "application/json",
          },
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

  export const CloseAccount = createAsyncThunk(
    "accounts/closeAccount",
    async (accountId: string, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${accountId}`,
          Method: "DELETE",
          Headers: {
            "Content-Type": "application/json",
          },
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

  export const ConvertCurrency = createAsyncThunk(
    "accounts/convertCurrency",
    async (data: { accountId: string; CurrencyConversionDTO: CurrencyConversionDTO }, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${data.accountId}/convert`,
          Method: "PUT",
          Headers: {
            "Content-Type": "application/json",
          },
          Data: data.CurrencyConversionDTO,
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );