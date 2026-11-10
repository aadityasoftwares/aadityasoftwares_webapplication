import { EnquiryPriority, EnquirySource, EnquiryStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface IEnquiry {
  _id: string;
  enquiryNumber: string;
  clientId?: string;
  prospectName: string;
  prospectEmail: string;
  prospectPhone?: string;
  companyName?: string;
  projectTitle: string;
  projectRequirements: string;
  projectDescription?: string;
  technologies: string[];
  estimatedBudget?: number;
  currencyId?: string;
  source: EnquirySource;
  assignedTo?: {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | string;
  priority: EnquiryPriority;
  status: EnquiryStatus;
  followUpDate?: string;
  expectedClosingDate?: string;
  internalNotes?: string;
  lostReason?: string;
  convertedClientId?: string;
  convertedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEnquiryFollowUp {
  _id?: string;
  enquiryId: string;
  followUpDate: string;
  remarks: string;
  contactMethod?: 'CALL' | 'EMAIL' | 'MEETING' | 'WHATSAPP';
  status?: 'PENDING' | 'DONE' | 'CANCELLED';
  conductedBy?: string;
  createdAt?: string;
}

export interface IEnquiryCreateInput {
  prospectName: string;
  prospectEmail: string;
  prospectPhone?: string;
  companyName?: string;
  projectTitle: string;
  projectRequirements: string;
  projectDescription?: string;
  technologies?: string[];
  estimatedBudget?: number;
  source?: EnquirySource;
  priority?: EnquiryPriority;
  status?: EnquiryStatus;
  followUpDate?: string;
  expectedClosingDate?: string;
  internalNotes?: string;
}

export interface IEnquiryUpdateInput extends Partial<IEnquiryCreateInput> {
  lostReason?: string;
}

export interface IEnquiryFilter extends QueryFilter {
  status?: EnquiryStatus | string;
  priority?: EnquiryPriority | string;
  source?: EnquirySource | string;
  assignedTo?: string;
}

