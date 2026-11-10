import { QuotationStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IQuotationItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  unitRate?: number;
  totalAmount?: number;
}

export interface IQuotation {
  _id: string;
  quotationNumber: string;
  clientId?: {
    _id: string;
    name: string;
    companyName?: string;
    email: string;
  } | string;
  title: string;
  items: IQuotationItem[];
  subTotal: number;
  taxRate?: number;
  taxAmount?: number;
  grandTotal: number;
  validUntil: string;
  status: QuotationStatus;
  paymentTerms?: string;
  termsAndConditions?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuotationFilter extends QueryFilter {
  status?: QuotationStatus | string;
  clientId?: string;
}

export interface IQuotationCreateInput {
  clientId: string;
  title?: string;
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
  validUntil?: string;
  paymentTerms?: string;
  notes?: string;
  status?: QuotationStatus | string;
}
