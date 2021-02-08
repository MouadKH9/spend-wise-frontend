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
