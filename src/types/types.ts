export interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  accounts?: Account[];
  defaultAccount?: Account;
}

export interface Account {
  id?: number;
  name?: string;
  balance: number;
  isSaving: boolean;
}

export interface Record {
  id?: number;
  title: string;
  date?: string;
  account?: string;
  category?: Category;
}

export interface Category {
  id?: string;
  icon?: string;
  name: string;
  type: 1 | -1;
}
