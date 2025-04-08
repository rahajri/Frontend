import { HttpInterceptorFn } from '@angular/common/http';
import { throwError, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  const router = inject(Router);

  const publicRoutes = [
    '/login',
    '/register',
    '/check-password-token',
    '/reset-password',
    '/cities/search',
    '/cities',
    '/siret',
    '/insee',
    '/verification-otp',
    '/verify',
    '/token',
    '/freelancer/project-details',
    '/employer/developer-details',
  ];

  const isPublicRoute = publicRoutes.some((route) => req.url.includes(route));

  if (isPublicRoute) {
    return next(req);
  }

  const accessToken = localStorage.getItem('token');
  const request = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(request);
};

// Refresh token function
const refreshToken = (httpClient: HttpClient) => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    return throwError(() => new Error('Refresh token not available'));
  }

  return httpClient
    .post<{ accessToken: string }>('/api/refresh-token', {
      token: refreshToken,
    })
    .pipe(
      switchMap((response) => {
        if (response && response.accessToken) {
          localStorage.setItem('token', response.accessToken);
          return of(response.accessToken);
        } else {
          return throwError(() => new Error('Failed to refresh token'));
        }
      })
    );
};
