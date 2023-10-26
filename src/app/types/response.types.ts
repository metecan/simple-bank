export interface ITransaction {
  id: number;
  currency: string;
  iban: number;
  date: string;
  status: string;
  amount: number;
}

export interface IBalance {
  id: number;
  currency: string;
  symbol: string;
  amount: number;
}
