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
  isLoggedIn: false, // persist сам восстановит
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
        role: "USER",
      };

      // Чистим токены из localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== LOGIN =====
      .addCase(LoginUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(LoginUserAction.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user.id = action.payload.userId;

        // Сохраняем токены вручную
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("userId", action.payload.userId);
      })

      // ===== REGISTER =====
      .addCase(RegisterUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RegisterUserAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      // ===== OTP SEND =====
      .addCase(SendOtpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(SendOtpAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(SendOtpAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      // ===== OTP VERIFY =====
      .addCase(VerifyOtpAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyOtpAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyOtpAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      // ===== RESET PASSWORD =====
      .addCase(ResetPasswordAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ResetPasswordAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(ResetPasswordAction.fulfilled, (state) => {
        state.isLoading = false;
      })

      // ===== GET USER INFO =====
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
      });
  },
});

export const { setIsLoading, setIsLoggedIn, setIsUserFetching, signOut } =
  authSlice.actions;

export default authSlice.reducer;
