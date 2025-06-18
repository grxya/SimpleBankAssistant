import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiManager from "../../services/apiManager";
import { ChatbotRequestDTO } from "../../data/dtos/ChatBot.dto";

const baseUrl = `${import.meta.env.VITE_API_URL}/chatbot`;

export const AskAction = createAsyncThunk(
  "chatbot/ask",
  async (ChatbotRequestDTO: ChatbotRequestDTO, { rejectWithValue }) => {
    try {
      const response = await ApiManager.apiRequest({
        Url: `${baseUrl}`,
        Method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        Data: ChatbotRequestDTO,
      });
      return response;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
