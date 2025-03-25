// auth-interceptor.service.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { curveNatural } from 'd3';
// import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

// Exclude specific URLs from interception
if (this.isExcludedUrl(request.url)) {
  return next.handle(request);
}


    const userData = this.authService.getUserData();
    if (userData) {
      request = this.addAuthorizationHeader(request, userData.token);
    }else {
      // If user data is not available, redirect to login page
      this.router.navigate(['/auth/login']);
      return throwError('User not authenticated');
    }

    
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.router.navigate(['/auth/login']);
        }
        return throwError(error);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  private isExcludedUrl(url: string): boolean {
    // Define the URLs that should be excluded from interception
    const excludedUrls = ['/user/login/', "/user/sign-up/", "/user/forgot-password/"];
    return excludedUrls.some(excludedUrl => url.includes(excludedUrl));
  }
}
