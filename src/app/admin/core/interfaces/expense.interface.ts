import { ExpenseCategory, ExpenseStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IExpense {
  _id: string;
  expenseNumber?: string;
  title: string;
  category: ExpenseCategory | string;
  amount: number;
  expenseDate?: string;
  date?: string;
  paymentMethod: string;
  vendorName?: string;
  receiptUrl?: string;
  notes?: string;
  description?: string;
  status?: ExpenseStatus | string;
  createdAt?: string;
}

export interface IExpenseCreateInput {
  title: string;
  category: ExpenseCategory | string;
  amount: number;
  expenseDate?: string;
  paymentMethod: string;
  vendorName?: string;
  notes?: string;
  status?: ExpenseStatus | string;
}

export interface IExpenseFilter extends QueryFilter {
  category?: string;
}
