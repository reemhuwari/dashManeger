import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { AdminTasksComponent } from './pages/admin-tasks/admin-tasks';
import { UserTasksComponent } from './pages/user-tasks/user-tasks';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
   { path: 'dashboard', component: DashboardComponent},
  { path: 'admin-tasks', component: AdminTasksComponent },
  { path: 'user-tasks', component: UserTasksComponent },
  {
  path: 'signup',
  loadComponent: () => import('./pages/signup/signup').then(m => m.SignupComponent)
}

];
