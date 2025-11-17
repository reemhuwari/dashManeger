import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, FormsModule,RouterLink],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: response => {
        // Save token
        localStorage.setItem('token', response.token);

        // Save user info
        localStorage.setItem('user', JSON.stringify(response.user));

        // Redirect based on role
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin-tasks']);
        } else {
          this.router.navigate(['/user-tasks']);
        }
      },
      error: err => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
