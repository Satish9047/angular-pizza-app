import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthResponse, LoginData, RegisterData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) {}

  register(registerData: RegisterData) {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/sign-up`, registerData)
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  login(loginData: LoginData) {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/sign-in`, loginData)
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    console.log('server', error);
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'Server is not responding';
    }
    return throwError(() => new Error(errorMessage));
  }
}
