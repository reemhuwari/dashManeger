import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.auth.signup(this.name, this.email, this.password).subscribe({
      next: (res) => {
        // save login session
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        // redirect to tasks page
        this.router.navigate(['/user-tasks']);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }
}
