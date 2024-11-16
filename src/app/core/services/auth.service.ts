import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthResponse, RegisterData } from '../interfaces/auth';

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
}
