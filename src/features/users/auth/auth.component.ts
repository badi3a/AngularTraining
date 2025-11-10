import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  showSuccessMessage = false;
  showErrorMessage = false;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.authForm = this.createForm();
  }

  private createForm(): FormGroup {
    if (this.isLoginMode) {
      return this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    } else {
      return this.fb.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      });
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.createForm();
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  validateField(fieldName: string): void {
    this.authForm.get(fieldName)?.markAsTouched();
  }

  getEmailErrorMessage(): string {
    const emailControl = this.authForm.get('email');
    if (emailControl?.errors?.['required']) return 'L\'email est requis';
    if (emailControl?.errors?.['email']) return 'Format d\'email invalide';
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.authForm.get('password');
    if (passwordControl?.errors?.['required']) return 'Le mot de passe est requis';
    if (passwordControl?.errors?.['minlength']) return 'Minimum 6 caractères';
    return '';
  }

  getUsernameErrorMessage(): string {
    const usernameControl = this.authForm.get('username');
    if (usernameControl?.errors?.['required']) return 'Le nom d\'utilisateur est requis';
    if (usernameControl?.errors?.['minlength']) return 'Minimum 3 caractères';
    return '';
  }

  getConfirmPasswordErrorMessage(): string {
    if (!this.passwordsMatch()) return 'Les mots de passe ne correspondent pas';
    return 'La confirmation est requise';
  }

  passwordsMatch(): boolean {
    const password = this.authForm.get('password')?.value;
    const confirmPassword = this.authForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  getFormProgress(): number {
    const totalFields = this.isLoginMode ? 2 : 4;
    const completedFields = Object.keys(this.authForm.controls)
      .filter(key => this.authForm.get(key)?.valid)
      .length;
    return Math.round((completedFields / totalFields) * 100);
  }

  onSubmit(): void {
    this.markAllFieldsTouched();

    if (this.authForm.valid && (this.isLoginMode || this.passwordsMatch())) {
      this.isLoading = true;
      this.showErrorMessage = false;

      // Simulation API
      setTimeout(() => {
        this.isLoading = false;
        this.showSuccessMessage = true;
        console.log('Form data:', this.authForm.value);
      }, 1500);
    } else {
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire';
    }
  }

  private markAllFieldsTouched(): void {
    Object.keys(this.authForm.controls).forEach(key => {
      this.authForm.get(key)?.markAsTouched();
    });
  }
}
