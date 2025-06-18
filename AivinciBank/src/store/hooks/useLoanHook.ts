import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  ApplyForLoanAction,
  GetLoanDebtAction,
  GetLoanHistoryAction,
  GetTotalLoanDebtAction,
} from "../actions/loanAction";
import { LoanDTO } from "../../data/dtos/Loan.dto";

export const useLoan = () => {
  const dispatch = useDispatch<AppDispatch>();

  const ApplyForLoan = async (loanData: LoanDTO) => {
    const result = await dispatch(ApplyForLoanAction(loanData));
    console.log(result);
    return result;
  };

  const GetLoanDebt = async () => {
    const result = await dispatch(GetLoanDebtAction());
    console.log(result);
    return result;
  };

  const GetTotalLoanDebt = async () => {
    const result = await dispatch(GetTotalLoanDebtAction());
    console.log(result);
    return result;
  };

  const GetLoanHistory = async () => {
    const result = await dispatch(GetLoanHistoryAction());
    console.log(result);
    return result;
  };

  return {
    ApplyForLoan,
    GetLoanDebt,
    GetTotalLoanDebt,
    GetLoanHistory,
  };
};

export const useLoanState = () => {
  return useSelector((state: RootState) => state.loan);
};
