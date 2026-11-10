import { PaymentStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IPayment {
  _id: string;
  paymentNumber: string;
  invoiceId?: {
    _id: string;
    invoiceNumber: string;
    grandTotal: number;
  } | string;
  clientId?: {
    _id: string;
    name: string;
  } | string;
  amount: number;
  paymentMethod: string;
  transactionReference?: string;
  paymentDate: string;
  status: PaymentStatus;
  notes?: string;
  createdAt: string;
}

export interface IPaymentFilter extends QueryFilter {
  status?: PaymentStatus | string;
  clientId?: string;
  invoiceId?: string;
}

