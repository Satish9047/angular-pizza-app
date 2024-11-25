import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { loggerInterceptor } from './core/interceptors/logger.interceptor';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { cachingInterceptor } from './core/interceptors/caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        cachingInterceptor,
        authInterceptor,
        refreshTokenInterceptor,
        loggerInterceptor,
      ]),
    ),
  ],
};
