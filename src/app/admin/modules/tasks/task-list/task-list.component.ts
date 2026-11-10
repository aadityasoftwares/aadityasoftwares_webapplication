import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskPriority, TaskStatus } from '../../../core/constants/admin-enums.constants';
import { IClient } from '../../../core/interfaces/client.interface';
import { ITask, ITaskCreateInput } from '../../../core/interfaces/task.interface';
import { AdminClientService } from '../../../core/services/admin-client.service';
import { AdminTaskService } from '../../../core/services/admin-task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(AdminTaskService);
  private readonly clientService = inject(AdminClientService);

  readonly TaskStatus = TaskStatus;
  readonly TaskPriority = TaskPriority;

  // Signals
  readonly tasks = signal<ITask[]>([]);
  readonly clients = signal<IClient[]>([]);
  readonly isLoading = signal<boolean>(true);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  // Filters
  readonly searchQuery = signal<string>('');
  readonly selectedStatus = signal<string>('ALL');
  readonly selectedPriority = signal<string>('ALL');

  // Modals
  readonly isModalOpen = signal<boolean>(false);
  readonly isEditing = signal<boolean>(false);
  readonly editingTaskId = signal<string | null>(null);
  readonly selectedTask = signal<ITask | null>(null);
  readonly isDetailDrawerOpen = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);

  // Form Model
  taskForm: ITaskCreateInput = {
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    status: TaskStatus.TODO,
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
    relatedClient: '',
  };

  ngOnInit(): void {
    this.loadTasks();
    this.loadClients();
  }

  loadTasks(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const filter: Record<string, string | number> = {
      limit: 50,
      sortBy: 'dueDate',
      sortOrder: 'asc',
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

    this.taskService.getTasks(filter).subscribe({
      next: (res: any) => {
        const list = res?.data?.items || (res?.data as unknown as ITask[]) || [];
        this.tasks.set(list);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to load project tasks.');
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
    this.loadTasks();
  }

  openCreateModal(): void {
    this.isEditing.set(false);
    this.editingTaskId.set(null);
    this.taskForm = {
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.TODO,
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 10),
      relatedClient: this.clients().length > 0 ? this.clients()[0]._id : '',
    };
    this.isModalOpen.set(true);
  }

  openEditModal(task: ITask): void {
    this.isEditing.set(true);
    this.editingTaskId.set(task._id);
    const clientVal = typeof task.relatedClient === 'object' && task.relatedClient !== null
      ? (task.relatedClient as { _id: string })._id
      : (task.relatedClient || '');

    this.taskForm = {
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '',
      relatedClient: clientVal,
    };
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  submitTask(): void {
    if (!this.taskForm.title) {
      this.errorMessage.set('Task Title is required.');
      return;
    }

    this.isSaving.set(true);

    if (this.isEditing() && this.editingTaskId()) {
      this.taskService.updateTask(this.editingTaskId()!, this.taskForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.showFlashSuccess('Task updated successfully.');
          this.loadTasks();
        },
        error: (err: any) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to update task.');
        },
      });
    } else {
      this.taskService.createTask(this.taskForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.closeModal();
          this.showFlashSuccess('Sprint task created successfully.');
          this.loadTasks();
        },
        error: (err: any) => {
          this.isSaving.set(false);
          this.errorMessage.set(err?.error?.message || 'Failed to create task.');
        },
      });
    }
  }

  updateStatus(task: ITask, newStatus: string): void {
    this.taskService.updateTask(task._id, { status: newStatus as TaskStatus }).subscribe({
      next: () => {
        this.showFlashSuccess(`Task status changed to ${newStatus}`);
        task.status = newStatus as TaskStatus;
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to update status.');
      },
    });
  }

  openDetailDrawer(task: ITask): void {
    this.selectedTask.set(task);
    this.isDetailDrawerOpen.set(true);
  }

  closeDetailDrawer(): void {
    this.isDetailDrawerOpen.set(false);
    this.selectedTask.set(null);
  }

  deleteTask(task: ITask): void {
    if (!confirm(`Are you sure you want to delete task "${task.title}"?`)) {
      return;
    }

    this.taskService.deleteTask(task._id).subscribe({
      next: () => {
        this.showFlashSuccess('Task deleted.');
        this.tasks.set(this.tasks().filter((t) => t._id !== task._id));
      },
      error: (err: any) => {
        this.errorMessage.set(err?.error?.message || 'Failed to delete task.');
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case TaskStatus.TODO:
        return 'badge-slate';
      case TaskStatus.IN_PROGRESS:
        return 'badge-blue';
      case TaskStatus.REVIEW:
        return 'badge-amber';
      case TaskStatus.COMPLETED:
        return 'badge-emerald';
      case TaskStatus.CANCELLED:
        return 'badge-rose';
      default:
        return 'badge-slate';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'priority-urgent';
      case TaskPriority.HIGH:
        return 'priority-high';
      case TaskPriority.MEDIUM:
        return 'priority-medium';
      case TaskPriority.LOW:
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