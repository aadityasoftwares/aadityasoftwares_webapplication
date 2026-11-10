import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceStatus } from '../../../core/constants/admin-enums.constants';
import { IClient } from '../../../core/interfaces/client.interface';
import { IInvoice } from '../../../core/interfaces/invoice.interface';
import { AdminClientService } from '../../../core/services/admin-client.service';
import { AdminInvoiceService } from '../../../core/services/admin-invoice.service';

interface LineItemForm {
  description: string;
  quantity: number;
  unitRate: number;
  totalAmount: number;
}

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  private readonly invoiceService = inject(AdminInvoiceService);
  private readonly clientService = inject(AdminClientService);

  readonly InvoiceStatus = InvoiceStatus;

  // Signals
  readonly invoices = signal<IInvoice[]>([]);
  readonly clients = signal<IClient[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');

  // Modals & Drawers
  readonly isModalOpen = signal<boolean>(false);
  readonly selectedInvoice = signal<IInvoice | null>(null);
  readonly isDetailDrawerOpen = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  // Form Model
  formClientId = '';
  formIssueDate = new Date().toISOString().slice(0, 10);
  formDueDate = new Date(Date.now() + 86400000 * 15).toISOString().slice(0, 10);
  formPaymentTerms = 'Due upon receipt / Net 15 days';
  formNotes = 'Payment via Bank NEFT / RTGS or UPI. Thank you for your business!';
  formItems: LineItemForm[] = [
    { description: 'Sprint Deliverable - Phase 1 Milestone', quantity: 1, unitRate: 65000, totalAmount: 65000 },
  ];

  ngOnInit(): void {
    this.loadInvoices();
    this.loadClients();
  }

  loadInvoices(): void {
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

    this.invoiceService.getInvoices(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IInvoice[]) || [];
        this.invoices.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load invoices.');
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
    this.loadInvoices();
  }

  openCreateModal(): void {
    this.formClientId = this.clients().length > 0 ? this.clients()[0]._id : '';
    this.formIssueDate = new Date().toISOString().slice(0, 10);
    this.formDueDate = new Date(Date.now() + 86400000 * 15).toISOString().slice(0, 10);
    this.formPaymentTerms = 'Net 15 Days';
    this.formNotes = 'Payment via Bank NEFT / RTGS or UPI. Thank you for choosing Aaditya Softwares!';
    this.formItems = [
      { description: 'Software Development Milestone Delivery', quantity: 1, unitRate: 65000, totalAmount: 65000 },
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

  submitInvoice(): void {
    if (!this.formClientId) {
      this.errorMessage.set('Please select a recipient client.');
      return;
    }

    if (this.formItems.length === 0 || !this.formItems[0].description) {
      this.errorMessage.set('Please specify at least one valid invoice item.');
      return;
    }

    this.isSaving.set(true);
    const sub = this.getSubtotal();
    const grand = this.getGrandTotal();

    const payload = {
      clientId: this.formClientId,
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
      issueDate: this.formIssueDate,
      dueDate: this.formDueDate,
      paymentTerms: this.formPaymentTerms,
      notes: this.formNotes,
      status: InvoiceStatus.DRAFT,
    };

    this.invoiceService.createInvoice(payload).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.showFlashSuccess('Invoice drafted successfully!');
        this.loadInvoices();
      },
      error: (err: any) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to create invoice.');
      },
    });
  }

  updateStatus(invoice: IInvoice, newStatus: string): void {
    this.invoiceService.updateInvoice(invoice._id, { status: newStatus as InvoiceStatus }).subscribe({
      next: () => {
        this.showFlashSuccess(`Invoice status changed to ${newStatus}`);
        invoice.status = newStatus as InvoiceStatus;
        this.loadInvoices();
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to update invoice status.');
      },
    });
  }

  sendEmail(invoice: IInvoice): void {
    this.invoiceService.sendEmail(invoice._id).subscribe({
      next: () => {
        this.showFlashSuccess(`Invoice #${invoice.invoiceNumber} dispatched to client via email.`);
        invoice.status = InvoiceStatus.SENT;
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to send invoice email.');
      },
    });
  }

  downloadPdf(invoice: IInvoice): void {
    this.invoiceService.downloadPdf(invoice._id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Invoice_${invoice.invoiceNumber}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.errorMessage.set('PDF download failed.');
      },
    });
  }

  openDetailDrawer(invoice: IInvoice): void {
    this.selectedInvoice.set(invoice);
    this.isDetailDrawerOpen.set(true);
  }

  closeDetailDrawer(): void {
    this.isDetailDrawerOpen.set(false);
    this.selectedInvoice.set(null);
  }

  cancelInvoice(invoice: IInvoice): void {
    const reason = prompt('Please enter cancellation reason:');
    if (!reason) return;

    this.invoiceService.cancelInvoice(invoice._id, reason).subscribe({
      next: () => {
        this.showFlashSuccess('Invoice marked as cancelled.');
        this.loadInvoices();
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Could not cancel invoice.');
      },
    });
  }

  deleteInvoice(invoice: IInvoice): void {
    if (!confirm(`Are you sure you want to permanently delete invoice #${invoice.invoiceNumber}?`)) {
      return;
    }

    this.invoiceService.deleteInvoice(invoice._id).subscribe({
      next: () => {
        this.showFlashSuccess('Invoice deleted.');
        this.invoices.set(this.invoices().filter((i) => i._id !== invoice._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete invoice.');
      },
    });
  }

  getClientDisplayName(clientId: IInvoice['clientId']): string {
    if (!clientId) return 'Client';
    if (typeof clientId === 'object') {
      return clientId.companyName ? `${clientId.name} (${clientId.companyName})` : clientId.name;
    }
    const found = this.clients().find((c) => c._id === clientId);
    return found ? (found.companyName ? `${found.name} (${found.companyName})` : found.name) : 'Client';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case InvoiceStatus.PAID:
        return 'badge-emerald';
      case InvoiceStatus.PARTIALLY_PAID:
        return 'badge-amber';
      case InvoiceStatus.SENT:
        return 'badge-blue';
      case InvoiceStatus.OVERDUE:
        return 'badge-rose';
      case InvoiceStatus.CANCELLED:
        return 'badge-slate';
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