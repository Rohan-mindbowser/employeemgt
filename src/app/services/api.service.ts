import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/manager/login`, data,  {responseType: 'text'});
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/manager/signup`, data,  {responseType: 'text'});
  }

}
