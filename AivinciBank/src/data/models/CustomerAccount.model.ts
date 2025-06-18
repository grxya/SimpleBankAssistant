export interface CustomerAccount {
  loading: Record<LoadingKey, boolean>;
  AccountsInfo: AccountInfo[];
}

export interface AccountInfo {
  customerId: string;
  iban: string;
  currency: string;
}

export type LoadingKey =
  | "create"
  | "update"
  | "getBalance"
  | "close"
  | "convert"
  | "getIbans";
