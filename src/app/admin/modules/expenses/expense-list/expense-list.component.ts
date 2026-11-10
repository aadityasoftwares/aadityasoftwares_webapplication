import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseCategory, ExpenseStatus } from '../../../core/constants/admin-enums.constants';
import { IExpense, IExpenseCreateInput } from '../../../core/interfaces/expense.interface';
import { AdminExpenseService } from '../../../core/services/admin-expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
})
export class ExpenseListComponent implements OnInit {
  private readonly expenseService = inject(AdminExpenseService);

  readonly ExpenseCategory = ExpenseCategory;
  readonly ExpenseStatus = ExpenseStatus;

  // Signals
  readonly expenses = signal<IExpense[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('ALL');

  // Modal
  readonly isModalOpen = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  // Form Model
  expenseForm: IExpenseCreateInput = {
    title: '',
    category: ExpenseCategory.INFRASTRUCTURE_HOSTING,
    amount: 5000,
    expenseDate: new Date().toISOString().slice(0, 10),
    paymentMethod: 'BANK_TRANSFER',
    vendorName: '',
    notes: '',
    status: ExpenseStatus.PAID,
  };

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, string | number> = {
      limit: 50,
      sortBy: 'expenseDate',
      sortOrder: 'desc',
    };

    if (this.selectedCategory() !== 'ALL') {
      filter['category'] = this.selectedCategory();
    }
    if (this.searchQuery().trim()) {
      filter['search'] = this.searchQuery().trim();
    }

    this.expenseService.getExpenses(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as IExpense[]) || [];
        this.expenses.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load operational expenses.');
        this.isLoading.set(false);
      },
    });
  }

  applyFilter(): void {
    this.loadExpenses();
  }

  openCreateModal(): void {
    this.expenseForm = {
      title: '',
      category: ExpenseCategory.INFRASTRUCTURE_HOSTING,
      amount: 5000,
      expenseDate: new Date().toISOString().slice(0, 10),
      paymentMethod: 'BANK_TRANSFER',
      vendorName: '',
      notes: '',
      status: ExpenseStatus.PAID,
    };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitExpense(): void {
    if (!this.expenseForm.title || !this.expenseForm.amount) {
      this.errorMessage.set('Title and Amount are required.');
      return;
    }

    this.isSaving.set(true);
    this.expenseService.createExpense(this.expenseForm).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeModal();
        this.showFlashSuccess('Operational expense logged.');
        this.loadExpenses();
      },
      error: (err: any) => {
        this.isSaving.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to save expense.');
      },
    });
  }

  deleteExpense(expense: IExpense): void {
    if (!confirm(`Are you sure you want to remove expense entry "${expense.title}"?`)) {
      return;
    }

    this.expenseService.deleteExpense(expense._id).subscribe({
      next: () => {
        this.showFlashSuccess('Expense removed.');
        this.expenses.set(this.expenses().filter((e) => e._id !== expense._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete expense.');
      },
    });
  }

  getTotalBurn(): number {
    return this.expenses().reduce((acc, curr) => acc + (curr.amount || 0), 0);
  }

  getCategoryPill(category: string): string {
    switch (category) {
      case ExpenseCategory.INFRASTRUCTURE_HOSTING:
        return 'cat-infra';
      case ExpenseCategory.SOFTWARE_LICENSE:
        return 'cat-soft';
      case ExpenseCategory.SALARY_PAYROLL:
        return 'cat-salary';
      case ExpenseCategory.OFFICE_RENT:
        return 'cat-office';
      case ExpenseCategory.MARKETING:
        return 'cat-mkt';
      default:
        return 'cat-misc';
    }
  }

  formatCategoryName(category: string): string {
    return category ? category.replace(/_/g, ' ') : 'Miscellaneous';
  }

  private showFlashSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => {
      this.successMessage.set(null);
    }, 4000);
  }
}