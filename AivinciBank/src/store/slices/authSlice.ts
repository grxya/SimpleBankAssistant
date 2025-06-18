import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../data/models/AuthData.model";
import {
  GetUserInfoAction,
  LoginUserAction,
  RegisterUserAction,
  ResetPasswordAction,
  SendOtpAction,
  VerifyOtpAction,
} from "../actions/authAction";

const initialState: AuthData = {
  isLoading: false,
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  isUserFetching: false,
  user: {
    id: "",
    fullname: "",
    email: "",
    enabled: false,
    role: "USER",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsUserFetching: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },
    signOut: (state) => {
      state.isLoggedIn = false;

      state.user = {
        id: "",
        fullname: "",
        email: "",
        enabled: false,
        role: "user",
      };

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLoggedIn");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(LoginUserAction.fulfilled, (state, action: any) => {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("isLoggedIn", JSON.stringify("true"));

        state.isLoading = false;
        state.isLoggedIn = true;

        state.user.id = action.payload.userId;
      })
      .addCase(RegisterUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RegisterUserAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(SendOtpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SendOtpAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(SendOtpAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyOtpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyOtpAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyOtpAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(ResetPasswordAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetPasswordAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ResetPasswordAction.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(GetUserInfoAction.pending, (state) => {
        state.isUserFetching = true;
      })
      .addCase(GetUserInfoAction.rejected, (state) => {
        state.isUserFetching = false;
      })
      .addCase(GetUserInfoAction.fulfilled, (state, action: any) => {
        state.isUserFetching = false;
        state.user = {
          id: action.payload.id,
          fullname: action.payload.fullname || "",
          email: action.payload.email || "",
          enabled: action.payload.enabled || false,
          role: (action.payload.role || "").toUpperCase(),
        };

        localStorage.setItem("userId", state.user.id);
      });
  },
});

export const { setIsLoading, setIsLoggedIn, setIsUserFetching, signOut } =
  authSlice.actions;
export default authSlice.reducer;
