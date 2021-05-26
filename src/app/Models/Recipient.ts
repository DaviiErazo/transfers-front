export interface IRecipient {
  email: String;
  recipientName: String;
  rut: String;
  phoneNumber: String;
  accountNumber: Number;
  bank: String;
  type: String;
  isDeleted?: boolean;
}