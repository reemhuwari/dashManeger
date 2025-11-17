import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, throwError, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // ================= LOGIN =================
  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          throw new Error('Invalid credentials');
        }

        return {
          token: user.token,
          user
        };
      })
    );
  }

  // ================= SIGN UP =================
  signup(name: string, email: string, password: string): Observable<any> {

    return this.http.get<any[]>(this.apiUrl).pipe(
      switchMap(users => {

        // check if email already exists
        if (users.some(u => u.email === email)) {
          return throwError(() => new Error("Email already exists"));
        }

        
        const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;

        
        const newToken = "fake-jwt-token-" + newId;

        
        const newUser = {
          id: newId,
          name,
          email,
          password,
          role: "user",
          token: newToken
        };

        
        return this.http.post(this.apiUrl, newUser).pipe(
          map(() => ({
            token: newToken,
            user: newUser
          }))
        );
      })
    );
  }

  // ================= Helpers =================
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
