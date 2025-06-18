import { useDispatch, useSelector } from "react-redux";
import {
  GetUserInfoAction,
  LoginUserAction,
  RegisterUserAction,
  ResetPasswordAction,
  SendOtpAction,
  VerifyOtpAction,
} from "../actions/authAction";
import {
  AuthDTO,
  LoginDTO,
  OtpSendDTO,
  OtpVerifyDTO,
  ResetPasswordDTO,
} from "../../data/dtos/Auth.dto";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";
import { signOut } from "../slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth);

  const Login = async (loginData: LoginDTO) => {
    const result = await dispatch(LoginUserAction(loginData));
    console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
    return result;
  };

  const Register = async (registerData: AuthDTO) => {
    const result = await dispatch(RegisterUserAction(registerData));
    console.log(result);
    return result;
  };

  const OtpSend = async (otpData: OtpSendDTO) => {
    const result = await dispatch(SendOtpAction(otpData));
    console.log(result);
    return result;
  };

  const OtpVerify = async (otpData: OtpVerifyDTO) => {
    const result = await dispatch(VerifyOtpAction(otpData));
    console.log(result.type);
    return result;
  };

  const ResetPassword = async (resetData: ResetPasswordDTO) => {
    const result = await dispatch(ResetPasswordAction(resetData));
    console.log(result);
    return result;
  };

  const GetUserInfo = async () => {
    const result = await dispatch(GetUserInfoAction(user.id));
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const SignOut = () => {
    dispatch(signOut());
    console.log("Signed out");
  };

  return {
    Login,
    Register,
    OtpSend,
    OtpVerify,
    ResetPassword,
    GetUserInfo,
    SignOut,
  };
};

export const useAuthState = () => {
  return useSelector((state: RootState) => state.auth);
};
