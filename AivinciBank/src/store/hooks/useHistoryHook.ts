import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  GetAccountHistoryAction,
  GetIncomeHistoryAction,
  GetLoanHistoryAction,
  GetTransferHistoryAction,
} from "../actions/historyAction";

export const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();

  const GetTransferHistory = async () => {
    const result = await dispatch(GetTransferHistoryAction());
    console.log(result);
    return result;
  };

  const GetAccountHistory = async () => {
    const result = await dispatch(GetAccountHistoryAction());
    console.log(result);
    return result;
  };

  const GetLoanHistory = async () => {
    const result = await dispatch(GetLoanHistoryAction());
    console.log(result.type);
    return result;
  };

  const GetIncomeHistory = async () => {
    const result = await dispatch(GetIncomeHistoryAction());
    console.log(result);
    return result;
  };

  return {
    GetTransferHistory,
    GetAccountHistory,
    GetLoanHistory,
    GetIncomeHistory,
  };
};

export const useHistoryState = () => {
  return useSelector((state: RootState) => state.history);
};