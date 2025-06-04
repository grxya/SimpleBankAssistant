import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import {
  InitiateTransferAction,
  VerifyOtpAction,
} from "../actions/moneyTransferAction";
import {
  OtpVerifyTransferDTO,
  TransferDTO,
} from "../../data/dtos/Transfer.dto";

export const useMoneyTransfer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const InitiateTransfer = async (transferData: TransferDTO) => {
    const result = await dispatch(InitiateTransferAction(transferData));
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const VerifyOtp = async (otpData: OtpVerifyTransferDTO) => {
    const result = await dispatch(VerifyOtpAction(otpData));
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  return { InitiateTransfer, VerifyOtp };
};
