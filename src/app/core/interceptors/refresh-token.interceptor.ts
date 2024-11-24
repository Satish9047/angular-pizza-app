import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return http
          .get('http://localhost:8080/api/v1/auth/refresh-token', {
            withCredentials: true,
          })
          .pipe(
            switchMap(() => {
              return next(req);
            }),
            catchError((refreshError) => {
              router.navigate(['/auth/login']);
              return throwError(() => new Error('Unauthorized'));
            }),
          );
      }
      return throwError(() => error);
    }),
  );
};
