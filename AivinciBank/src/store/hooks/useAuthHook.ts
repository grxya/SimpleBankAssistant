import { useDispatch } from "react-redux";
import {
  LoginUserAction,
  RegisterUserAction,
  SendOtpAction,
  VerifyOtpAction,
} from "../actions/authAction";
import {
  AuthDTO,
  LoginDTO,
  OtpSendDTO,
  OtpVerifyDTO,
} from "../../data/dtos/Auth.dto";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const Login = async (loginData: LoginDTO) => {
    const result = await dispatch(LoginUserAction(loginData));
    console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/user");
    }
  };

  const Register = async (registerData: AuthDTO) => {
    const result = await dispatch(RegisterUserAction(registerData));
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const OtpSend = async (otpData: OtpSendDTO) => {
    const result = await dispatch(SendOtpAction(otpData));
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  const OtpVerify = async (otpData: OtpVerifyDTO) => {
    const result = await dispatch(VerifyOtpAction(otpData));
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  return { Login, Register, OtpSend, OtpVerify };
};
