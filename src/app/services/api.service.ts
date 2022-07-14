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
  getAllEmployees(m_id: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/manager/getemployees/?m_id=${m_id}`);
  }

  //delete employee
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/api/manager/deleteemployee/?id=${id}`, {
      responseType: 'text',
    });
  }

  //get single employee
  getSingleEmployee(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/api/manager/singleemployee/?id=${id}`, {
      responseType: 'text',
    });
  }

  //update employee details
  updateEmployee(id: any, data: any): Observable<any> {
    return this.http.patch(
      `${baseUrl}/api/manager/updateemployee/?id=${id}`,
      data,
      {
        responseType: 'text',
      }
    );
  }

  // getNewTokens() {
  //   return this.http.post(`${baseUrl}/api/manager/refreshtoken`, {
  //     refreshToken: localStorage.getItem('refreshToken'),
  //   });
  // }
}
