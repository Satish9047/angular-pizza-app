import { RegisterData } from './../../../core/interfaces/auth';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading = false;
  error: null | string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    this.error = null;
    this.isLoading = true;

    const registerData: RegisterData = {
      name: this.registerForm.get('name')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
      phone: this.registerForm.get('phone')?.value ?? '',
      address: this.registerForm.get('address')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['login']);
        }
        this.registerForm.reset();
        this.isLoading = false;
      },
      error: (error: any) => {
        this.error = error.message || 'An error occurred during registration.';
        this.isLoading = false;
      },
    });
  }
}
