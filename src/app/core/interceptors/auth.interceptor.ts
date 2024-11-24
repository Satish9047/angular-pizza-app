import { Observable } from 'rxjs';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const modifiedReq = req.clone({
    withCredentials: true,
  });
  return next(modifiedReq);
}
