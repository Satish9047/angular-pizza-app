import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse) {
  let errorMessage = 'An unknown error occurred';
  console.log('server', error);

  if (error.error && error.error.message) {
    errorMessage = error.error.message;
  } else if (error.status === 0) {
    errorMessage = 'Server is not responding';
  }
  return throwError(() => new Error(errorMessage));
}
