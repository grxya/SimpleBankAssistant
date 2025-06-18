export interface TransferDTO {
  senderIban: string;
  receiverIban: string;
  amount: number;
}

export interface OtpVerifyTransferDTO {
  email: string;
  code: string;
}
