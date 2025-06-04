import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

const moneyTransferSlice = createSlice({
  name: "moneyTransfer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export default moneyTransferSlice.reducer;
