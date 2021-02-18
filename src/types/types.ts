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
  initialBalance?: number;
}

export interface Record {
  id?: number;
  description: string;
  date?: string;
  account?: Account;
  category?: Category;
  amount: number;
}

export interface Category {
  id?: number;
  icon?: string;
  name?: string;
  type?: 1 | -1;
  parentCategoryId?: number;
}

export interface Details {
  date?: string;
  description?: string;
}
