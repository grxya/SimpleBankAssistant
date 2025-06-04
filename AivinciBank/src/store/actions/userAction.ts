import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { User } from "../../data/models/User.model";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const GetAllUsersAction = createAsyncThunk(
  "users/all",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/`,
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

export const CreateUserAction = createAsyncThunk(
  "users/create",
  async (NewUser: User, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Data: NewUser,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const GetUserAction = createAsyncThunk(
  "users/one",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${userId}`,
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

export const UpdateUserAction = createAsyncThunk(
  "users/update",
  async (data: { userId: string; NewUser: User }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${data.userId}`,
        Method: "PUT",
        Headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        Data: data.NewUser,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const DeleteUserAction = createAsyncThunk(
  "users/delete",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/${userId}`,
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
