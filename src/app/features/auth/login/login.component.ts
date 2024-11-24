import { Component } from '@angular/core';

import { AuthService } from './../../../core/services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
          this.authService.setUser(response.data);
          this.router.navigate(['user/dashboard']);
        }
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.loginForm.reset();
        setTimeout(() => {
          this.error = null;
        }, 3000);
      },
    });
    this.loginForm.reset();
  }
}
