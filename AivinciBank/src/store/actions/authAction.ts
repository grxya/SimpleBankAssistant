import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginDTO,
  AuthDTO,
  OtpSendDTO,
  OtpVerifyDTO,
  ResetPasswordDTO,
} from "../../data/dtos/Auth.dto";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const LoginUserAction = createAsyncThunk(
  "auth/login",
  async (LoginDTO: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/auth/login`,
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
        Url: `${baseUrl}/auth/register`,
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

export const SendOtpAction = createAsyncThunk(
  "auth/send-otp",
  async (OtpSendDTO: OtpSendDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/auth/send-otp`,
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
        Url: `${baseUrl}/auth/verify-otp`,
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

export const ResetPasswordAction = createAsyncThunk(
  "auth/reset-password",
  async (ResetPasswordDTO: ResetPasswordDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/auth/reset-password`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: ResetPasswordDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const GetUserInfoAction = createAsyncThunk(
  "users/current",
  async (userId: string, { rejectWithValue }) => {
    try {
      
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/users/${userId}`,
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

