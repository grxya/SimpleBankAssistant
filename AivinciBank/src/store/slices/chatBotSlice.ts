import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AskAction } from "../actions/chatBotAction";

const initialState: any = {};

const chatBotSlice = createSlice({
  name: "chatBot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AskAction.fulfilled, (state, action: any) => {});
  },
});

export default chatBotSlice.reducer;
