import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsersAction } from "../actions/userAction";

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
      .addCase(GetAllUsersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetAllUsersAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetAllUsersAction.fulfilled, (state, action: any) => {
        state.isLoading = false;

        state.users = action.payload.map((user: any) => ({
          id: user.id,
          fullname: user.username || "",
          email: user.email || "",
        }));
      });
  },
});
