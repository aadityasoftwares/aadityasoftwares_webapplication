import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientStatus } from '../../../core/constants/admin-enums.constants';
import { IClient, IClientCreateInput } from '../../../core/interfaces/client.interface';
import { AdminClientService } from '../../../core/services/admin-client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  private readonly clientService = inject(AdminClientService);

  readonly ClientStatus = ClientStatus;

  // Signals
  readonly clients = signal<IClient[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');

  // Modals
  readonly isModalOpen = signal<boolean>(false);
  readonly isEditing = signal<boolean>(false);
  readonly editingClientId = signal<string | null>(null);
  readonly selectedClient = signal<IClient | null>(null);
  readonly isDetailDrawerOpen = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  // Form Model
  clientForm: IClientCreateInput = {
    name: '',
    companyName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    website: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      countryCode: 'IN',
    },
    gstin: '',
    pan: '',
    status: ClientStatus.ACTIVE,
    notes: '',
  };

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
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

    this.clientService.getClients(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IClient[]) || [];
        this.clients.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load clients list.');
        this.isLoading.set(false);
      },
    });
  }

  applyFilter(): void {
    this.loadClients();
  }

  openCreateModal(): void {
    this.isEditing.set(false);
    this.editingClientId.set(null);
    this.clientForm = {
      name: '',
      companyName: '',
      email: '',
      phone: '',
      alternatePhone: '',
      website: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        countryCode: 'IN',
      },
      gstin: '',
      pan: '',
      status: ClientStatus.ACTIVE,
      notes: '',
    };
    this.isModalOpen.set(true);
  }

  openEditModal(client: IClient): void {
    this.isEditing.set(true);
    this.editingClientId.set(client._id);
    this.clientForm = {
      name: client.name,
      companyName: client.companyName || '',
      email: client.email,
      phone: client.phone || '',
      alternatePhone: client.alternatePhone || '',
      website: client.website || '',
      billingAddress: {
        street: client.billingAddress?.street || '',
        city: client.billingAddress?.city || '',
        state: client.billingAddress?.state || '',
        postalCode: client.billingAddress?.postalCode || '',
        countryCode: client.billingAddress?.countryCode || 'IN',
      },
      gstin: client.gstin || '',
      pan: client.pan || '',
      status: client.status,
      notes: client.notes || '',
    };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitClient(): void {
    if (!this.clientForm.name || !this.clientForm.email) {
      this.errorMessage.set('Client Name and Email are required.');
      return;
    }

    this.isSaving.set(true);

    if (this.isEditing() && this.editingClientId()) {
      this.clientService.updateClient(this.editingClientId()!, this.clientForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.showFlashSuccess('Client updated successfully.');
          this.loadClients();
        },
        error: (err: any) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update client.');
        },
      });
    } else {
      this.clientService.createClient(this.clientForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.showFlashSuccess('Client created successfully.');
          this.loadClients();
        },
        error: (err: any) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create client.');
        },
      });
    }
  }

  openDetailDrawer(client: IClient): void {
    this.selectedClient.set(client);
    this.isDetailDrawerOpen.set(true);
  }

  closeDetailDrawer(): void {
    this.isDetailDrawerOpen.set(false);
    this.selectedClient.set(null);
  }

  deleteClient(client: IClient): void {
    if (!confirm(`Are you sure you want to delete client account "${client.name}"?`)) {
      return;
    }

    this.clientService.deleteClient(client._id).subscribe({
      next: () => {
        this.showFlashSuccess('Client deleted.');
        this.clients.set(this.clients().filter((c) => c._id !== client._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete client.');
      },
    });
  }

  getClientInitials(name: string): string {
    if (!name) return 'CL';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case ClientStatus.ACTIVE:
        return 'status-active';
      case ClientStatus.INACTIVE:
        return 'status-inactive';
      case ClientStatus.BLOCKED:
        return 'status-blocked';
      default:
        return 'status-default';
    }
  }

  private showFlashSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 4000);
  }
}