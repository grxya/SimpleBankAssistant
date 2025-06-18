import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}/history`;

export const GetTransferHistoryAction = createAsyncThunk(
  "history/transfer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/transfer`,
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

export const GetIncomeHistoryAction = createAsyncThunk(
  "history/income",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/income`,
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

export const GetAccountHistoryAction = createAsyncThunk(
  "history/customer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/customer`,
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

export const GetLoanHistoryAction = createAsyncThunk(
  "history/loan",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/loan`,
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
