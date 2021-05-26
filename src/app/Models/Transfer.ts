export interface ITransfer {
  rut: String;
  recipientName: String;
  phoneNumber: String;
  bank: String;
  type: String;
  amount: number;
}

export interface ICreateTransfer {
  recipientId: string;
  amount: number;
}