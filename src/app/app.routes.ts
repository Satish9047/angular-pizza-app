import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/users/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProfileComponent } from './features/users/profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'home',
    component: HeaderComponent,
    title: 'Super Pizza',
  },
  {
    path: 'user',
    component: HeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
    ],
  },
];
