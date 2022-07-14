import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  setAccessToken(token: any) {
    localStorage.setItem('JWT_TOKEN', JSON.stringify(token));
  }
  setRefreshToken(token: any) {
    localStorage.setItem('refreshToken', JSON.stringify(token));
  }
  isLoggedIn() {
    return !!localStorage.getItem('JWT_TOKEN');
  }
  getToken() {
    return localStorage.getItem('JWT_TOKEN');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  removeAccessToken() {
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigate(['']);
  }
  removeRefreshToken() {
    localStorage.removeItem('refreshToken');
  }

  logout() {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('refreshToken');

    this.router.navigate(['']);
  }
}
