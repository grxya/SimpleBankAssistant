import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import {
  ApplyForLoanAction,
  GetLoanDebtAction,
  GetLoanHistoryAction,
  GetTotalLoanDebtAction,
} from "../actions/loanAction";
import { LoanDTO } from "../../data/dtos/Loan.dto";

export const useLoan = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const ApplyForLoan = async (loanData: LoanDTO) => {
    const result = await dispatch(ApplyForLoanAction(loanData));
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const GetLoanDebt = async () => {
    const result = await dispatch(GetLoanDebtAction());
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const GetTotalLoanDebt = async () => {
    const result = await dispatch(GetTotalLoanDebtAction());
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const GetLoanHistory = async () => {
    const result = await dispatch(GetLoanHistoryAction());
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  return {
    ApplyForLoan,
    GetLoanDebt,
    GetTotalLoanDebt,
    GetLoanHistory,
  };
};
