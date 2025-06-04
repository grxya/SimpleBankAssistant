import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  },
});

export default loanSlice.reducer;
