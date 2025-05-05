import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { LoanDTO } from "../../data/dtos/Loan.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/loans`;

export const ApplyForLoan = createAsyncThunk(
    "loans/apply",
    async (LoanDTO: LoanDTO, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/apply`,
          Method: "POST",
          Headers: {
            "Content-Type": "application/json",
          },
          Data: LoanDTO,
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

export const GetLoanDebt = createAsyncThunk(
    "loans/debt",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/debt`,
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

  export const GetTotalLoanDebt = createAsyncThunk(
    "loans/total-debt",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/total-debt`,
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
    "loans/history",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/history`,
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