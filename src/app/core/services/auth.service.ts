import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { handleError } from '../utils/ErrorHandler';

import {
  ApiResponse,
  LoginData,
  RegisterData,
  ResponseUser,
} from '../interfaces/auth';
import { config } from '../constant/baseApiUrl';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
      .post<
        ApiResponse<ResponseUser>
      >(`${config.baseUrl}/auth/sign-up`, registerData)
      .pipe(catchError((error: any) => handleError(error)));
  }

  login(loginData: LoginData) {
    return this.http
      .post<
        ApiResponse<ResponseUser>
      >(`${config.baseUrl}/auth/sign-in`, loginData)
      .pipe(catchError((error: any) => handleError(error)));
  }

  me() {
    return this.http
      .get<ApiResponse<ResponseUser>>(`${config.baseUrl}/user`)
      .pipe(catchError((error) => handleError(error)));
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
}
