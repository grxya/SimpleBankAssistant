import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export default historySlice.reducer;
