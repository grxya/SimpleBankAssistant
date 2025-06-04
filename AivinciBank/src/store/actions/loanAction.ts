import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { LoanDTO } from "../../data/dtos/Loan.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/loans`;

export const ApplyForLoanAction = createAsyncThunk(
    "loans/apply",
    async (LoanDTO: LoanDTO, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/apply`,
          Method: "POST",
          Headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          Data: LoanDTO,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

export const GetLoanDebtAction = createAsyncThunk(
    "loans/debt",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/debt`,
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

  export const GetTotalLoanDebtAction = createAsyncThunk(
    "loans/total-debt",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/total-debt`,
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

  export const GetLoanHistoryAction = createAsyncThunk(
    "loans/history",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/history`,
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