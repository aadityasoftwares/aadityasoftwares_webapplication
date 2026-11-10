import { TaskPriority, TaskStatus } from '../constants/admin-enums.constants';
import { QueryFilter } from './common.interface';

export interface ITask {
  _id: string;
  title: string;
  description?: string;
  assignedTo?: {
    _id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  } | string;
  relatedClient?: {
    _id: string;
    name: string;
  } | string;
  relatedEnquiry?: {
    _id: string;
    enquiryNumber: string;
    projectTitle: string;
  } | string;
  dueDate?: string;
  completedAt?: string;
  priority: TaskPriority;
  status: TaskStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITaskCreateInput {
  title: string;
  description?: string;
  assignedTo?: string;
  relatedClient?: string;
  relatedEnquiry?: string;
  dueDate?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  internalNotes?: string;
}

export interface ITaskFilter extends QueryFilter {
  status?: TaskStatus | string;
  priority?: TaskPriority | string;
  assignedTo?: string;
}

