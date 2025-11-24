import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../shared/data/login.service';
import { JwtDecoderService } from '../../../shared/data/jwt-decoder.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  message: string = '';
  errorMessages: any[] = [];
  display: string = '';
  regexp: RegExp = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  auth: any = { email: '', password: '' };

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.regexp)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.loginAttemptUser(this.formLogin.value);
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

  loginAttemptUser(val: any) {
    console.log("Tentative de login", val);

    this.display = '';
    this.errorMessages = [];

    // Vérification des champs
    if (!val.email && !val.password) {
      this.message = "Fields are empty!";
      return;
    } else if (!val.email) {
      this.message = "Email field is empty";
      return;
    } else if (!val.password) {
      this.message = "Password field is empty";
      return;
    } else if (!this.regexp.test(val.email.toLowerCase())) {
      this.message = "Verify the email";
      return;
    }

    this.auth.email = val.email;
    this.auth.password = val.password;

    // Déconnexion si token existant
    const existingToken = localStorage.getItem("access_token");
    if (existingToken) {
      this.LoginService.logout(existingToken.replace(/^"(.*)"$/, '$1')).subscribe();
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // Tentative de login
    this.LoginService.loginAtemptUser(this.auth).subscribe(
      (data: any) => {
        localStorage.setItem('access_token', JSON.stringify(data.access_token));
        this.LoginService.isAuthenticatedSubject.next(true);

        const tokenStr = localStorage.getItem('access_token');
        if (tokenStr) {
          const decoder: JwtDecoderService = new JwtDecoderService();
          const decodedToken = decoder.decodeToken(tokenStr.replace(/^"(.*)"$/, '$1'));
          localStorage.setItem("languagePreference", decodedToken.languagePreference || '');

          if (decodedToken.roles.includes("ROLE_ADMIN")) {
            this.router.navigate(['/events']);
          } else if (decodedToken.roles.includes("ROLE_CLIENT")) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.errorMessages = [{
            severity: 'warn',
            summary: 'Warning',
            detail: 'No token found. Please log in again.'
          }];
        }
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessages = [{
            severity: 'error',
            summary: 'Error',
            detail: 'Wrong credentials. Try again'
          }];
        } else {
          this.errorMessages = [{
            severity: 'warn',
            summary: 'Warning',
            detail: 'Something went wrong. Please try again later'
          }];
        }
      }
    );
  }
}
