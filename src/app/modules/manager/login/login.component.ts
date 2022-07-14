import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

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
    private toast: NgToastService,
    private router: Router
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
      (data) => {
        if (data) {
          let parsed_data = JSON.parse(data);
          let manager_id = parsed_data.m_id;
          this._authService.setAccessToken(parsed_data.accessToken);
          this._authService.setRefreshToken(parsed_data.refreshToken);
          this.router.navigate([`dashboard/${parsed_data.m_id}`]);
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
