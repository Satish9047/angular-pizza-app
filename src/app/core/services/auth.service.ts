import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthResponse, LoginData, RegisterData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(registerData: RegisterData) {
    return this.http
      .post<AuthResponse>(
        'http://localhost:8080/api/v1/auth/sign-up',
        registerData,
      )
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  login(loginData: LoginData) {
    return this.http
      .post<AuthResponse>(
        'http://localhost:8080/api/v1/auth/sign-in',
        loginData,
      )
      .pipe(
        catchError((error: any) => {
          console.log('from service', error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
