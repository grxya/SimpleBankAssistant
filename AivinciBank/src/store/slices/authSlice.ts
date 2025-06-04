import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData, RegisterData } from "../../data/models/AuthData.model";
import { LoginUserAction, RegisterUserAction } from "../actions/authAction";

const initialState: AuthData = {
  isLoading: false,
  isLoggedIn: false,
  isRegister: false,
  registerData: {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  user: {
    id: "",
    fullname: "",
    email: "",
    password: "",
    enabled: false,
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
    setIsRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegister = action.payload;
    },
    setRegisterData: (state, action: PayloadAction<RegisterData>) => {
      state.registerData = action.payload;
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
        state.isLoading = false;
        state.isRegister = false;
        state.isLoggedIn = true;

        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);

        localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      })
      .addCase(RegisterUserAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUserAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RegisterUserAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegister = true;
      });
  },
});

export const { setRegisterData, setIsRegister, setIsLoading } =
  authSlice.actions;
export default authSlice.reducer;
