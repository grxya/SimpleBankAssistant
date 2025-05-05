import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { User } from "../../data/models/User.model";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const GetAllUsers = createAsyncThunk(
    "users/all",
    async (_, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/`,
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

  export const CreateUser = createAsyncThunk(
    "users/create",
    async (NewUser: User, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/`,
          Method: "POST",
          Headers: {
            "Content-Type": "application/json",
          },
          Data: NewUser,
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );

  export const GetUser = createAsyncThunk(
    "users/one",
    async (userId: string, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${userId}`,
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

  export const UpdateUser = createAsyncThunk(
    "users/update",
    async (data: { userId: string; NewUser: User }, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
            Url: `${baseUrl}/${data.userId}`,
            Method: "PUT",
          Headers: {
            "Content-Type": "application/json",
          },
          Data: data.NewUser,
          WithCredentials: true,
        });
        return response;
      } catch (error: any) {
        return rejectWithValue(error);
      }
    }
  );  
  
  export const DeleteUser = createAsyncThunk(
    "users/delete",
    async (userId: string, { rejectWithValue }) => {
      try {
        const response = await ApiManager.apiRequest({
          Url: `${baseUrl}/${userId}`,
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