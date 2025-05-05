import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsers } from "../actions/userAction";

const initialState: any = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetAllUsers.fulfilled, (state, action: any) => {
        state.isLoading = false;

        state.users = action.payload.map((user: any) => ({
          id: user.id,
          fullname: user.username || "",
          email: user.email || "",
        }));
      });
  },
});
