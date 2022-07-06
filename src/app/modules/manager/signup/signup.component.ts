import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(private _apiService: ApiService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }
  singupManager() {
    this._apiService.signup(this.formGroup.value).subscribe(
      (res) => {
        if (res) {
          alert('Success');
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
    console.log(this.formGroup.value);
  }
}
