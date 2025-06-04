import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import {
  GetAccountHistoryAction,
  GetLoanHistoryAction,
  GetTransferHistoryAction,
} from "../actions/historyAction";

export const useHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const GetTransferHistory = async () => {
    const result = await dispatch(GetTransferHistoryAction());
    console.log(result);
    return result.meta.requestStatus === "fulfilled";

  };

  const GetAccountHistory = async () => {
    const result = await dispatch(GetAccountHistoryAction());
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const GetLoanHistory = async () => {
    const result = await dispatch(GetLoanHistoryAction());
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  return {
    GetTransferHistory,
    GetAccountHistory,
    GetLoanHistory,
  };
};
