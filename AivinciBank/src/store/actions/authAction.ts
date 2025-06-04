import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginDTO,
  AuthDTO,
  OtpSendDTO,
  OtpVerifyDTO,
  RefreshDTO,
} from "../../data/dtos/Auth.dto";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const LoginUserAction = createAsyncThunk(
  "auth/login",
  async (LoginDTO: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/login`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: LoginDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const RegisterUserAction = createAsyncThunk(
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
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const RefreshUserAction = createAsyncThunk(
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
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const SendOtpAction = createAsyncThunk(
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
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const VerifyOtpAction = createAsyncThunk(
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
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
