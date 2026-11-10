import { InvoiceStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IInvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  unitRate?: number;
  totalAmount?: number;
}

export interface IInvoice {
  _id: string;
  invoiceNumber: string;
  clientId?: {
    _id: string;
    name: string;
    companyName?: string;
    email: string;
  } | string;
  title: string;
  items: IInvoiceItem[];
  subTotal: number;
  taxAmount?: number;
  grandTotal: number;
  paidAmount: number;
  outstandingBalance: number;
  dueDate: string;
  status: InvoiceStatus;
  paymentTerms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IInvoiceFilter extends QueryFilter {
  status?: InvoiceStatus | string;
  clientId?: string;
}

export interface IInvoiceCreateInput {
  clientId: string;
  items: Array<{
    description: string;
    quantity: number;
    unitRate: number;
    grossAmount?: number;
    taxableAmount?: number;
    totalAmount?: number;
  }>;
  subTotal: number;
  taxableAmount?: number;
  grandTotal: number;
  issueDate?: string;
  dueDate: string;
  paymentTerms?: string;
  notes?: string;
  status?: InvoiceStatus | string;
}
