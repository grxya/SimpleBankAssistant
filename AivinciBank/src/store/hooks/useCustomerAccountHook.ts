import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import {
  BalanceUpdateDTO,
  CurrencyConversionDTO,
  CustomerAccountDTO,
} from "../../data/dtos/CustomerAccount.dto";
import {
  CloseAccountAction,
  ConvertCurrencyAction,
  CreateAccountAction,
  GetBalanceAction,
  UpdateBalanceAction,
} from "../actions/customerAccountAction";

export const useCustomerAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const CreateAccount = async (customerData: CustomerAccountDTO) => {
    const result = await dispatch(CreateAccountAction(customerData));
    console.log(result);
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/user");
    }
  };

  const UpdateBalance = async (
    accountId: string,
    balanceData: BalanceUpdateDTO
  ) => {
    const result = await dispatch(
      UpdateBalanceAction({ accountId, BalanceUpdateDTO: balanceData })
    );
    console.log(result);
    return result.meta.requestStatus === "fulfilled";
  };

  const GetBalance = async (accountId: string) => {
    const result = await dispatch(GetBalanceAction(accountId));
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  const CloseAccount = async (accountId: string) => {
    const result = await dispatch(CloseAccountAction(accountId));
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  const ConvertCurrency = async (
    accountId: string,
    currencyData: CurrencyConversionDTO
  ) => {
    const result = await dispatch(
      ConvertCurrencyAction({ accountId, CurrencyConversionDTO: currencyData })
    );
    console.log(result.type);
    return result.meta.requestStatus === "fulfilled";
  };

  return {
    CreateAccount,
    UpdateBalance,
    GetBalance,
    CloseAccount,
    ConvertCurrency,
  };
};
