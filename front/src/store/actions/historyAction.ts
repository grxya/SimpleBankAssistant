import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}/history`;

export const GetTransferHistory = createAsyncThunk(
    "history/transfer",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/transfer`,
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

  export const GetAccountHistory = createAsyncThunk(
    "history/customer",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/customer`,
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

  export const GetLoanHistory = createAsyncThunk(
    "history/loan",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/loan`,
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