import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //Manager login
  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/manager/login`, data, {
      responseType: 'text',
    });
  }

  //Manager signup
  signup(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/api/manager/signup`, data, {
      responseType: 'text',
    });
  }

  //Add an employee
  addEmployee(data: any) {
    return this.http.post(`${baseUrl}/api/manager/addemployee`, data, {
      responseType: 'text',
    });
  }

  //get all employees lis
  getAllEmployees(): Observable<any> {
    return this.http.get(`${baseUrl}/api/manager/getemployees`);
  }

  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/manager/deleteemployee/?id=${id}`, {
      responseType: 'text',
    });
  }
}
