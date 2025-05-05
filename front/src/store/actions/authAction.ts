import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthDTO, OtpSendDTO, OtpVerifyDTO, RefreshDTO } from "../../data/dtos/Auth.dto";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (AuthDTO: AuthDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/login`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: AuthDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (AuthDTO: AuthDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/register`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: AuthDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const RefreshUser = createAsyncThunk(
  "auth/refresh",
  async (RefreshDTO: RefreshDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/refresh`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: RefreshDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const SendOtp = createAsyncThunk(
  "auth/send-otp",
  async (OtpSendDTO: OtpSendDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/send-otp`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: OtpSendDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const VerifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async (OtpVerifyDTO: OtpVerifyDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/verify-otp`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: OtpVerifyDTO,
        WithCredentials: true,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
