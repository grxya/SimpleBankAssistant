import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import {
  OtpVerifyTransferDTO,
  TransferDTO,
} from "../../data/dtos/Transfer.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/transfers`;

export const InitiateTransferAction = createAsyncThunk(
  "transfers/initiate",
  async (TransferDTO: TransferDTO, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Data: TransferDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const VerifyOtpAction = createAsyncThunk(
  "transfers/verify-otp",
  async (OtpVerifyTransferDTO: OtpVerifyTransferDTO, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/verify-otp`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Data: OtpVerifyTransferDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
