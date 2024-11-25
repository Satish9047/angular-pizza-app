import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { CacheService } from './../services/cache.service';

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (req.method !== 'GET') {
    return next(req);
  }
  const cacheKey = req.urlWithParams;
  const cachedResponse = cacheService.getCache(cacheKey);

  if (cachedResponse) {
    return of(new HttpResponse({ body: cachedResponse, status: 200 }));
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cacheService.setCache(cacheKey, event.body);
      }
    }),
  );
};
