import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetAllUsersAction, GetUserAction } from "../actions/userAction";

const initialState: any = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
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
          fullname: user.fullname || "",
          email: user.email || "",
          enabled: user.enabled || false,
          role: user.role || "",
        }));
      })
      .addCase(GetUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(GetUserAction.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});
export const { setIsLoading } = userSlice.actions;
export default userSlice.reducer;
