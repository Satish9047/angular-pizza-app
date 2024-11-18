import { AuthService } from './../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
    console.log;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['user/dashboard']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message || 'An error occurred during login.';
        this.isLoading = false;
        this.loginForm.reset();
      },
    });
    this.loginForm.reset();
  }
}
