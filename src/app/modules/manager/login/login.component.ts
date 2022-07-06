import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private _apiService: ApiService,
    private _authService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  loginManager() {
    this._apiService.login(this.formGroup.value).subscribe(
      (accessToken) => {
        if (accessToken) {
          alert(accessToken);
          this._authService.setAccessToken(accessToken);
          this.formGroup.reset();
        }
      },
      (err) => {
        if (err) {
          this.toast.error({
            detail: 'Invalid Email/Password',
            summary: 'Invalid Email/Password',
            duration: 5000,
          });
        }
      }
    );
  }
}
