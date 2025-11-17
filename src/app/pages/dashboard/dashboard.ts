import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: 'dashboard.html',
  imports: [CommonModule, RouterModule],
  
})
export class DashboardComponent {
  user: any;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/'; // يعيد التوجيه للـ login
  }
}
