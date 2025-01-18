import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  username: string = '';
  bearerToken: string = '';

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmitt() {
    if (this.loginForm.valid) {
      // Simulating a login request
      const loginSuccess = false; // Set to false to simulate a failed login

      if (!loginSuccess) {
        this.showError = true;
        this.errorMessage = 'Invalid username or password. Please try again.';
        return;
      }

      console.log('Login Data:', this.loginForm.value);
    }
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loginService.generateToken(this.loginForm.value).subscribe({
        next : (response) => {
          this.username = response.username;
          this.bearerToken = response.bearerToken;
          this.loginService.login(this.bearerToken);
          this.router.navigate(['/dashboard']).then(r => console.log(`login successful for ${this.username}`));
        },
        error : (error: Error) => {
          console.log(`Login Failed: ${error.message}`);
          this.showError = true;
          this.errorMessage = 'Invalid username or password. Please try again.';
          return;
        }
      });
    } else {
      console.log("Form is empty");
      this.showError = true;
      this.errorMessage = 'Empty form';
      return;
    }
  }

  closeError() {
    this.showError = false;
    this.errorMessage = '';
  }
}
