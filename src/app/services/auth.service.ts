import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setAccessToken(token:any){
    localStorage.setItem('JWT_TOKEN', JSON.stringify(token));
  }
}
