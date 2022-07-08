import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  // updateFormGroup!: FormGroup;

  singleEmployee!: any;

  firstname: string = '';
  lastname: string = '';
  address: string = '';
  dob!: any;
  mobile: number = 0;
  empID: any;

  constructor(
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _apiService: ApiService,
    private toast: NgToastService,
    private route:Router
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
    this._apiService.getAllEmployees(this.manager_id).subscribe((employees) => {
      if (employees) {
        this.employeeLsitArray = employees;
      }
    },(err)=>{
      if(err){
        console.log(err)
        this.toast.error({
          detail: 'Server Failed',
          duration: 5000,
        });
        this.route.navigate([""])
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

  updateFormGroup = new FormGroup({
    updated_firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    updated_lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    updated_dob: new FormControl('', [Validators.required]),
    updated_mobile: new FormControl('', [Validators.required]),
    updated_address: new FormControl('', [Validators.required]),
  });

  //get single employee
  getSingleEmployee(id: any) {
    this._apiService.getSingleEmployee(id).subscribe((employee) => {
      if (employee) {
        this.singleEmployee = JSON.parse(employee);
        this.updateFormGroup.patchValue({
          updated_firstname: this.singleEmployee.firstname,
          updated_lastname: this.singleEmployee.lastname,
          updated_dob: this.singleEmployee.dob,
          updated_mobile: this.singleEmployee.mobile,
          updated_address: this.singleEmployee.address,
        });
        console.log(this.singleEmployee.firstname);
      }
    });
  }

  updateEmployee() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._apiService
          .updateEmployee(this.singleEmployee._id, this.updateFormGroup.value)
          .subscribe((res) => {
            if (res) {
              this.getEmployeeList();
              this.updateFormGroup.reset();
            }
          });
        Swal.fire('Updated!', 'Employee Updated successfuly', 'success');
      }
    });
  }
}
