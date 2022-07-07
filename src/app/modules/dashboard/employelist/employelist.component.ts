import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employelist',
  templateUrl: './employelist.component.html',
  styleUrls: ['./employelist.component.scss'],
})
export class EmployelistComponent implements OnInit {
  formGroup!: FormGroup;
  employeeLsitArray!: any;

  constructor(
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
    private toast: NgToastService
  ) {}
  manager_id!: any;
  ngOnInit(): void {
    this.manager_id = this.activatedRoute.snapshot.params['id'];
    this.initForm();
    this.getEmployeeList();
  }

  logout() {
    this._authService.removeAccessToken();
  }
  //Creating form
  initForm() {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      dob: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      createdby: new FormControl(this.manager_id),
    });
  }

  //Adding employee in DB
  addEmployee() {
    this._apiService.addEmployee(this.formGroup.value).subscribe(
      (res) => {
        if (res) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Employee Added Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getEmployeeList();

          this.formGroup.reset();
        }
      },
      (err) => {
        if (err) {
          this.toast.error({
            detail: err.error,
            duration: 5000,
          });
        }
      }
    );
  }

  //get all employees
  getEmployeeList() {
    this._apiService.getAllEmployees().subscribe((employees) => {
      if (employees) {
        this.employeeLsitArray = employees;
      }
    });
  }

  //Delete Employee
  deleteEmployee(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._apiService.deleteEmployee(id).subscribe((res) => {
          if (res) {
            this.getEmployeeList();
          }
        });

        Swal.fire('Deleted!', 'Employee Deleted successfuly', 'success');
      }
    });
  }
}
