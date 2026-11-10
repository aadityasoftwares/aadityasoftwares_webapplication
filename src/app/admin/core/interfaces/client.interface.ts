import { ClientStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IAddress {
  street?: string;
  city?: string;
  state?: string;
  stateCode?: string;
  postalCode?: string;
  countryCode?: string;
}

export interface IClient {
  _id: string;
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  website?: string;
  billingAddress?: IAddress;
  shippingAddress?: IAddress;
  gstin?: string;
  pan?: string;
  currencyId?: string;
  status: ClientStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IClientCreateInput {
  name: string;
  companyName?: string;
  email: string;
  phone?: string;
  alternatePhone?: string;
  website?: string;
  billingAddress?: IAddress;
  shippingAddress?: IAddress;
  gstin?: string;
  pan?: string;
  status?: ClientStatus;
  notes?: string;
}

export interface IClientFilter extends QueryFilter {
  status?: ClientStatus | string;
}

