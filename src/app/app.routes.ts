import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/users/dashboard/dashboard.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProfileComponent } from './features/users/profile/profile.component';
import { CustomOrderComponent } from './features/users/custom-order/custom-order.component';
import { YourOrdersComponent } from './features/users/your-orders/your-orders.component';
import { InventoryComponent } from './features/admin/inventory/inventory.component';
import { RequestedOrdersComponent } from './features/admin/requested-orders/requested-orders.component';
import { authGuard } from './core/guard/auth.guard';

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
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
      { path: 'profile', component: ProfileComponent, title: 'Profile' },
      {
        path: 'your-orders',
        component: YourOrdersComponent,
        title: 'Your Orders',
      },
      {
        path: 'custom-order',
        component: CustomOrderComponent,
        title: 'Order',
      },
    ],
  },
  {
    path: 'admin',
    component: HeaderComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
        title: 'Inventory',
      },
      {
        path: 'requested-orders',
        component: RequestedOrdersComponent,
        title: 'Requested Orders',
      },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
