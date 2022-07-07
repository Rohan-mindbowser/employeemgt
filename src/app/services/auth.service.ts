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
  isLoggedIn() {
    return !!localStorage.getItem('JWT_TOKEN');
  }
  removeAccessToken() {
    localStorage.removeItem('JWT_TOKEN');
    this.router.navigate(['']);
  }
}
