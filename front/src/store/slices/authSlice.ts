import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData, RegisterData } from "../../data/models/AuthData.model";
import { LoginUser, RegisterUser } from "../actions/authAction";

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
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(LoginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(LoginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegister = false;
        state.isLoggedIn = true;

        localStorage.setItem("isLoggedIn", JSON.stringify(state.isLoggedIn));
      })
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegisterUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(RegisterUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isRegister = true;
      });
  },
});

export const { setRegisterData, setIsRegister, setIsLoading } =
  authSlice.actions;
export default authSlice.reducer;
