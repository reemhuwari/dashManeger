import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';
import { TaskService } from '../../services/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class AdminTasksComponent implements OnInit {
  tasks: any[] = [];
  users: any[] = [];
  newTask = { title: '', description: '', assignedTo: null };

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadTasks();
    this.loadUsers();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe(tasks => this.tasks = tasks);
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => this.users = users.filter(u => u.role === 'user'));
  }

  createTask() {
    this.taskService.createTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', description: '', assignedTo: null };
      this.loadTasks();
    });
  }

  editTask(task: any) {
    const updatedTitle = prompt('Edit Title', task.title);
    const updatedDesc = prompt('Edit Description', task.description);
    if (updatedTitle && updatedDesc) {
      this.taskService.updateTask(task.id, {...task, title: updatedTitle, description: updatedDesc}).subscribe(() => this.loadTasks());
    }
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(() => this.loadTasks());
  }

  getUserName(userId: number) {
    const user = this.users.find(u => u.id === userId);
    return user ? user.name : '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
