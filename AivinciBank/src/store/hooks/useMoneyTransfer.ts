import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
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
    return result;
  };

  const VerifyOtp = async (otpData: OtpVerifyTransferDTO) => {
    const result = await dispatch(VerifyOtpAction(otpData));
    console.log(result.type);
    return result;
  };

  return { InitiateTransfer, VerifyOtp };
};

export const useTransferState = () => {
  return useSelector((state: RootState) => state.moneyTransfer);
};