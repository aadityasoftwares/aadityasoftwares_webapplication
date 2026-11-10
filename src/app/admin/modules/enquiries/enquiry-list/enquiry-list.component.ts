import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiryPriority, EnquirySource, EnquiryStatus } from '../../../core/constants/admin-enums.constants';
import { IEnquiry, IEnquiryCreateInput, IEnquiryFollowUp } from '../../../core/interfaces/enquiry.interface';
import { AdminEnquiryService } from '../../../core/services/admin-enquiry.service';

@Component({
  selector: 'app-enquiry-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.scss'],
})
export class EnquiryListComponent implements OnInit {
  private readonly enquiryService = inject(AdminEnquiryService);

  readonly EnquiryStatus = EnquiryStatus;
  readonly EnquiryPriority = EnquiryPriority;
  readonly EnquirySource = EnquirySource;

  // State signals
  readonly enquiries = signal<IEnquiry[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');
  readonly selectedPriority = signal<string>('ALL');

  // Modals & Drawers
  readonly isCreateModalOpen = signal<boolean>(false);
  readonly selectedEnquiry = signal<IEnquiry | null>(null);
  readonly isDetailDrawerOpen = signal<boolean>(false);
  readonly isFollowUpModalOpen = signal<boolean>(false);
  readonly followUpsList = signal<IEnquiryFollowUp[]>([]);
  readonly isSaving = signal<boolean>(false);

  // Form Models
  newEnquiry: IEnquiryCreateInput = {
    prospectName: '',
    prospectEmail: '',
    prospectPhone: '',
    companyName: '',
    projectTitle: '',
    projectRequirements: '',
    estimatedBudget: 50000,
    source: EnquirySource.WEBSITE,
    priority: EnquiryPriority.MEDIUM,
    status: EnquiryStatus.NEW,
    internalNotes: '',
  };

  followUpForm = {
    remarks: '',
    followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
    contactMethod: 'CALL' as 'CALL' | 'EMAIL' | 'MEETING' | 'WHATSAPP',
  };

  ngOnInit(): void {
    this.loadEnquiries();
  }

  loadEnquiries(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, string | number> = {
      limit: 50,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    };

    if (this.selectedStatus() !== 'ALL') {
      filter['status'] = this.selectedStatus();
    }
    if (this.selectedPriority() !== 'ALL') {
      filter['priority'] = this.selectedPriority();
    }
    if (this.searchQuery().trim()) {
      filter['search'] = this.searchQuery().trim();
    }

    this.enquiryService.getEnquiries(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IEnquiry[]) || [];
        this.enquiries.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load enquiries.');
        this.isLoading.set(false);
      },
    });
  }

  applyFilter(): void {
    this.loadEnquiries();
  }

  openCreateModal(): void {
    this.newEnquiry = {
      prospectName: '',
      prospectEmail: '',
      prospectPhone: '',
      companyName: '',
      projectTitle: '',
      projectRequirements: '',
      estimatedBudget: 50000,
      source: EnquirySource.WEBSITE,
      priority: EnquiryPriority.MEDIUM,
      status: EnquiryStatus.NEW,
      internalNotes: '',
    };
    this.isCreateModalOpen.set(true);
  }

  closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  submitCreate(): void {
    if (!this.newEnquiry.prospectName || !this.newEnquiry.prospectEmail || !this.newEnquiry.projectTitle) {
      this.errorMessage.set('Please fill in required fields (Name, Email, Project Title).');
      return;
    }

    this.isSaving.set(true);
    this.enquiryService.createEnquiry(this.newEnquiry).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeCreateModal();
        this.showFlashSuccess('Enquiry created successfully!');
        this.loadEnquiries();
      },
      error: (err: any) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Could not create enquiry.');
      },
    });
  }

  openDetailDrawer(enquiry: IEnquiry): void {
    this.selectedEnquiry.set(enquiry);
    this.isDetailDrawerOpen.set(true);
    this.loadFollowUps(enquiry._id);
  }

  closeDetailDrawer(): void {
    this.isDetailDrawerOpen.set(false);
    this.selectedEnquiry.set(null);
  }

  loadFollowUps(enquiryId: string): void {
    this.enquiryService.getFollowUps(enquiryId).subscribe({
      next: (res: any) => {
        const items = (res?.data as unknown as IEnquiryFollowUp[]) || [];
        this.followUpsList.set(items);
      },
      error: () => {
        this.followUpsList.set([]);
      },
    });
  }

  openFollowUpModal(enquiry: IEnquiry): void {
    this.selectedEnquiry.set(enquiry);
    this.followUpForm = {
      remarks: '',
      followUpDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
      contactMethod: 'CALL',
    };
    this.isFollowUpModalOpen.set(true);
  }

  closeFollowUpModal(): void {
    this.isFollowUpModalOpen.set(false);
  }

  submitFollowUp(): void {
    const enq = this.selectedEnquiry();
    if (!enq) return;

    if (!this.followUpForm.remarks) {
      this.errorMessage.set('Please enter follow-up remarks.');
      return;
    }

    this.isSaving.set(true);
    this.enquiryService
      .addFollowUp(enq._id, {
        enquiryId: enq._id,
        remarks: this.followUpForm.remarks,
        followUpDate: this.followUpForm.followUpDate,
        contactMethod: this.followUpForm.contactMethod,
      })
      .subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeFollowUpModal();
          this.showFlashSuccess('Follow-up scheduled successfully!');
          if (this.isDetailDrawerOpen()) {
            this.loadFollowUps(enq._id);
          }
        },
        error: (err: any) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to add follow-up.');
        },
      });
  }

  updateStatus(enquiry: IEnquiry, newStatus: string): void {
    this.enquiryService.updateEnquiry(enquiry._id, { status: newStatus as EnquiryStatus }).subscribe({
      next: () => {
        this.showFlashSuccess(`Status updated to ${newStatus}`);
        enquiry.status = newStatus as EnquiryStatus;
        this.loadEnquiries();
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to update status.');
      },
    });
  }

  convertToClient(enquiry: IEnquiry): void {
    if (!confirm(`Are you sure you want to convert "${enquiry.prospectName}" into an active client?`)) {
      return;
    }

    this.enquiryService.convertToClient(enquiry._id).subscribe({
      next: () => {
        this.showFlashSuccess(`Lead converted to Client successfully!`);
        this.loadEnquiries();
        if (this.isDetailDrawerOpen()) {
          this.closeDetailDrawer();
        }
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Could not convert to client.');
      },
    });
  }

  deleteEnquiry(enquiry: IEnquiry): void {
    if (!confirm(`Are you sure you want to delete lead #${enquiry.enquiryNumber}?`)) {
      return;
    }

    this.enquiryService.deleteEnquiry(enquiry._id).subscribe({
      next: () => {
        this.showFlashSuccess('Enquiry deleted.');
        this.enquiries.set(this.enquiries().filter((e) => e._id !== enquiry._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete enquiry.');
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case EnquiryStatus.NEW:
        return 'badge-cyan';
      case EnquiryStatus.CONTACTED:
        return 'badge-blue';
      case EnquiryStatus.DISCUSSION:
        return 'badge-amber';
      case EnquiryStatus.PROPOSAL_SENT:
        return 'badge-indigo';
      case EnquiryStatus.NEGOTIATION:
        return 'badge-purple';
      case EnquiryStatus.WON:
        return 'badge-emerald';
      case EnquiryStatus.LOST:
        return 'badge-rose';
      default:
        return 'badge-slate';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case EnquiryPriority.URGENT:
        return 'priority-urgent';
      case EnquiryPriority.HIGH:
        return 'priority-high';
      case EnquiryPriority.MEDIUM:
        return 'priority-medium';
      case EnquiryPriority.LOW:
        return 'priority-low';
      default:
        return 'priority-slate';
    }
  }

  private showFlashSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 4000);
  }
}