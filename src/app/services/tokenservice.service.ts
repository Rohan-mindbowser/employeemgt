import { Injectable, Injector } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { baseUrl } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root',
})
export class TokenserviceService implements HttpInterceptor {
  constructor(
    private inject: Injector,
    private http: HttpClient,
    private _apiService: ApiService,
    private router: Router,
    private _authService: AuthService,
    private toast: NgToastService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let _authService = this.inject.get(AuthService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'bearer ' + _authService.getToken(),
      },
    });
    return next.handle(jwtToken).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this._authService.logout();
        }
        return throwError(() =>
          this.toast.error({
            detail: 'Something went wrong',
            duration: 5000,
          })
        );
      })
    );
    // .pipe(
    //   catchError((err:HttpErrorResponse) => {
    //     if (err.status === 401) {
    //       return this.http
    //         .post('http://localhost:8000/api/manager/refreshtoken', {
    //           refreshToken: _authService.getRefreshToken(),
    //         })
    //         .pipe(
    //           switchMap((res: any) => {
    //             console.log('res:', res);
    //             localStorage.setItem('JWT_TOKEN', JSON.stringify(res.accessToken));
    //             localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
    //             let jwtToken = req.clone({
    //               setHeaders: {
    //                 Authorization: 'bearer ' + res.accessToken,
    //               },
    //             });
    //             return next.handle(jwtToken);
    //           })
    //         );
    //     }
    //     return throwError(err);
    //   })
    // );
  }
}
