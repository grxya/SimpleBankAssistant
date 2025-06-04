import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";

const baseUrl = `${import.meta.env.VITE_API_URL}/chatbot`;

export const AskAction = createAsyncThunk(
  "chatbot/ask",
  async (Question: string, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}/ask`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        Data: Question,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
