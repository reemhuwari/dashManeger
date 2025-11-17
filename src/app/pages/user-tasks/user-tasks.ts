import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserTasksComponent implements OnInit {
  tasks: any[] = [];
  currentUser: any;

  constructor(private taskService: TaskService, private authService: AuthService, private router: Router) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasksByUser(this.currentUser.id).subscribe(tasks => this.tasks = tasks);
  }

  updateStatus(task: any) {
    const newStatus = prompt('Update Status', task.status);
    if (newStatus) {
      this.taskService.updateTask(task.id, {...task, status: newStatus}).subscribe(() => this.loadTasks());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
