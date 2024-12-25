import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, of, switchMap } from 'rxjs';
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
    '/api.vectorshift.ai/api/pipelines/run',
  ];

  const isPublicRoute = publicRoutes.some((route) => req.url.includes(route));

  if (isPublicRoute) {
    return next(req);
  }

  const accessToken = localStorage.getItem('token');
  var refresh = false;
  const request = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(request);
  // .pipe(
  //   catchError((err: HttpErrorResponse) => {
  //     if (err.status === 401 && !refresh) {
  //       refresh = true;
  //       // Refresh token logic
  //       return refreshToken(httpClient).pipe(
  //         switchMap((newToken: string) => {
  //           localStorage.setItem('token', newToken);

  //           const newRequest = req.clone({
  //             setHeaders: {
  //               Authorization: `Bearer ${newToken}`,
  //             },
  //           });

  //           return next(newRequest);
  //         }),
  //         catchError(() => {
  //           localStorage.removeItem('token');
  //           router.navigate(['/login']);
  //           return throwError(() => new Error('Unauthorized'));
  //         })
  //       );
  //     }

  //     refresh = false;
  //     return throwError(() => err);
  //   })
  // );
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
