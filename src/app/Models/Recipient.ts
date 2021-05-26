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

export class Recipient {
  email: String;
  recipientName: String;
  rut: String;
  phoneNumber: String;
  accountNumber: Number;
  bank: String;
  type: String;
  isDeleted: Boolean;

  constructor() {
    {
      (this.email = ''),
        (this.recipientName = ''),
        (this.rut = ''),
        (this.phoneNumber = ''),
        (this.accountNumber = 0),
        (this.bank = ''),
        (this.type = ''),
        (this.isDeleted = false);
    }
  }
}
