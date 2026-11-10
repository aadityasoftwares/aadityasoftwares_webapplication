import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuotationStatus } from '../../../core/constants/admin-enums.constants';
import { IClient } from '../../../core/interfaces/client.interface';
import { IQuotation } from '../../../core/interfaces/quotation.interface';
import { AdminClientService } from '../../../core/services/admin-client.service';
import { AdminQuotationService } from '../../../core/services/admin-quotation.service';

interface LineItemForm {
  description: string;
  quantity: number;
  unitRate: number;
  totalAmount: number;
}

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.scss'],
})
export class QuotationListComponent implements OnInit {
  private readonly quotationService = inject(AdminQuotationService);
  private readonly clientService = inject(AdminClientService);

  readonly QuotationStatus = QuotationStatus;

  // Signals
  readonly quotations = signal<IQuotation[]>([]);
  readonly clients = signal<IClient[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');

  // Modals
  readonly isModalOpen = signal<boolean>(false);
  readonly selectedQuotation = signal<IQuotation | null>(null);
  readonly isDetailDrawerOpen = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  // Create Form State
  formClientId = '';
  formTitle = '';
  formValidUntil = new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10);
  formPaymentTerms = '50% Advance, 50% upon milestone completion';
  formNotes = '';
  formItems: LineItemForm[] = [
    { description: 'Full Stack Web Application Development (Angular + Node.js)', quantity: 1, unitRate: 85000, totalAmount: 85000 },
  ];

  ngOnInit(): void {
    this.loadQuotations();
    this.loadClients();
  }

  loadQuotations(): void {
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
    if (this.searchQuery().trim()) {
      filter['search'] = this.searchQuery().trim();
    }

    this.quotationService.getQuotations(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IQuotation[]) || [];
        this.quotations.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load quotations.');
        this.isLoading.set(false);
      },
    });
  }

  loadClients(): void {
    this.clientService.getClients({ limit: 100 }).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IClient[]) || [];
        this.clients.set(list);
      },
      error: () => {},
    });
  }

  applyFilter(): void {
    this.loadQuotations();
  }

  openCreateModal(): void {
    this.formClientId = this.clients().length > 0 ? this.clients()[0]._id : '';
    this.formTitle = 'Custom Software Development & Cloud Deployment';
    this.formValidUntil = new Date(Date.now() + 86400000 * 30).toISOString().slice(0, 10);
    this.formPaymentTerms = '50% Advance, 50% upon milestone completion';
    this.formNotes = 'Includes 3 months of complimentary production support and SLA monitoring.';
    this.formItems = [
      { description: 'Full Stack Web Application Development (Angular + Node.js)', quantity: 1, unitRate: 85000, totalAmount: 85000 },
    ];
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  addLineItem(): void {
    this.formItems.push({
      description: '',
      quantity: 1,
      unitRate: 0,
      totalAmount: 0,
    });
  }

  removeLineItem(index: number): void {
    if (this.formItems.length > 1) {
      this.formItems.splice(index, 1);
    }
  }

  calculateItemTotal(item: LineItemForm): void {
    item.totalAmount = (item.quantity || 0) * (item.unitRate || 0);
  }

  getSubtotal(): number {
    return this.formItems.reduce((acc, item) => acc + (item.quantity || 0) * (item.unitRate || 0), 0);
  }

  getGrandTotal(): number {
    return this.getSubtotal();
  }

  submitQuotation(): void {
    if (!this.formClientId) {
      this.errorMessage.set('Please select a client for this proposal.');
      return;
    }

    if (this.formItems.length === 0 || !this.formItems[0].description) {
      this.errorMessage.set('Please provide at least one valid line item.');
      return;
    }

    this.isSaving.set(true);
    const sub = this.getSubtotal();
    const grand = this.getGrandTotal();

    const payload = {
      clientId: this.formClientId,
      title: this.formTitle,
      items: this.formItems.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        unitRate: item.unitRate,
        grossAmount: item.totalAmount,
        taxableAmount: item.totalAmount,
        totalAmount: item.totalAmount,
      })),
      subTotal: sub,
      taxableAmount: sub,
      grandTotal: grand,
      validUntil: this.formValidUntil,
      paymentTerms: this.formPaymentTerms,
      notes: this.formNotes,
      status: QuotationStatus.DRAFT,
    };

    this.quotationService.createQuotation(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.showFlashSuccess('Quotation draft generated successfully!');
        this.loadQuotations();
      },
      error: (err: any) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to create quotation.');
      },
    });
  }

  updateStatus(quotation: IQuotation, newStatus: string): void {
    this.quotationService.updateQuotation(quotation._id, { status: newStatus as QuotationStatus }).subscribe({
      next: () => {
        this.showFlashSuccess(`Quotation status changed to ${newStatus}`);
        quotation.status = newStatus as QuotationStatus;
        this.loadQuotations();
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to update quotation status.');
      },
    });
  }

  openDetailDrawer(quotation: IQuotation): void {
    this.selectedQuotation.set(quotation);
    this.isDetailDrawerOpen.set(true);
  }

  closeDetailDrawer(): void {
    this.isDetailDrawerOpen.set(false);
    this.selectedQuotation.set(null);
  }

  deleteQuotation(quotation: IQuotation): void {
    if (!confirm(`Are you sure you want to delete quotation #${quotation.quotationNumber}?`)) {
      return;
    }

    this.quotationService.deleteQuotation(quotation._id).subscribe({
      next: () => {
        this.showFlashSuccess('Quotation deleted.');
        this.quotations.set(this.quotations().filter((q) => q._id !== quotation._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete quotation.');
      },
    });
  }

  downloadPdf(quotation: IQuotation): void {
    this.quotationService.downloadPdf(quotation._id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Quotation_${quotation.quotationNumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.errorMessage.set('PDF generation failed or route not available.');
      },
    });
  }

  getClientDisplayName(clientId: IQuotation['clientId']): string {
    if (!clientId) return 'Unknown Client';
    if (typeof clientId === 'object') {
      return clientId.companyName ? `${clientId.name} (${clientId.companyName})` : clientId.name;
    }
    const found = this.clients().find((c) => c._id === clientId);
    return found ? (found.companyName ? `${found.name} (${found.companyName})` : found.name) : 'Client';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case QuotationStatus.DRAFT:
        return 'badge-slate';
      case QuotationStatus.SENT:
        return 'badge-blue';
      case QuotationStatus.ACCEPTED:
        return 'badge-emerald';
      case QuotationStatus.REJECTED:
        return 'badge-rose';
      case QuotationStatus.EXPIRED:
        return 'badge-amber';
      default:
        return 'badge-slate';
    }
  }

  private showFlashSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 4000);
  }
}