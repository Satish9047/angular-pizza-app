import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

import {
  ApiResponse,
  LoginData,
  RegisterData,
  ResponseUser,
} from '../interfaces/auth';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:8080/api/v1/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(registerData: RegisterData) {
    return this.http
      .post<ApiResponse<ResponseUser>>(`${this.authUrl}/sign-up`, registerData)
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  login(loginData: LoginData) {
    return this.http
      .post<ApiResponse<ResponseUser>>(`${this.authUrl}/sign-in`, loginData)
      .pipe(catchError((error: any) => this.handleError(error)));
  }

  setUser(user: ResponseUser) {
    this.userSubject.next(user);
  }

  isAuthenticated() {
    return this.userSubject.value !== null;
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
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
