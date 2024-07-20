export class TransactionDto {
  currencyName: string;
  walletAddressId: number;
  receiverAddress: string;
  amount: number;
}

export class VerifyTransactionDto {
  currencyName: string;
  transactionId: string;
}
