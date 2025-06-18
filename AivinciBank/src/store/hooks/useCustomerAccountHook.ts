import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
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
  GetIbansAction,
  UpdateBalanceAction,
} from "../actions/customerAccountAction";

export const useCustomerAccount = () => {
  const dispatch = useDispatch<AppDispatch>();

  const CreateAccount = async (customerData: CustomerAccountDTO) => {
    const result = await dispatch(CreateAccountAction(customerData));
    console.log(result);
    return result;
  };

  const UpdateBalance = async (
    accountId: string,
    balanceData: BalanceUpdateDTO
  ) => {
    const result = await dispatch(
      UpdateBalanceAction({ accountId, BalanceUpdateDTO: balanceData })
    );
    console.log(result);
    return result;
  };

  const GetBalance = async (accountId: string) => {
    const result = await dispatch(GetBalanceAction(accountId));
    console.log(result.type);
    console.log(result);
    console.log(result.payload);
    return result;
  };

  const CloseAccount = async (accountId: string) => {
    const result = await dispatch(CloseAccountAction(accountId));
    console.log(result.type);
    console.log(result);
    console.log(result.payload);

    return result;
  };

  const ConvertCurrency = async (
    accountId: string,
    currencyData: CurrencyConversionDTO
  ) => {
    const result = await dispatch(
      ConvertCurrencyAction({ accountId, CurrencyConversionDTO: currencyData })
    );
    console.log(result.meta);
    return result;
  };

  const GetIbans = async () => {
    const result = await dispatch(GetIbansAction());
    console.log(result.payload);
    return result.payload;
  };

  return {
    CreateAccount,
    UpdateBalance,
    GetBalance,
    CloseAccount,
    ConvertCurrency,
    GetIbans,
  };
};

export const useAccountState = () => {
    return useSelector((state: RootState) => state.customerAccount);
  };