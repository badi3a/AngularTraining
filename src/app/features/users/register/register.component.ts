import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../shared/data/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;
  passwordType: string = 'password';

  constructor(private router: Router, private loginService: LoginService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/)]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      phones: this.fb.array([ this.fb.control('', Validators.required) ])
    });
  }

  // Getter pour le FormArray des téléphones
  get phones(): FormArray {
    return this.formRegister.get('phones') as FormArray;
  }

  // Ajouter un champ téléphone
  addPhone() {
    this.phones.push(this.fb.control('', Validators.required));
  }

  // Toggle affichage du mot de passe
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  // Enregistrer l'utilisateur
  save() {
    if (this.formRegister.invalid) {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs', 'error');
      return;
    }

    const formValue = this.formRegister.value;

    // Préparer l'objet à envoyer au backend
const data = {
  firstName: formValue.firstName,
  lastName: formValue.lastName,
  email: formValue.email,
  password: formValue.password,
  address: {
    street: formValue.address.street,
    city: formValue.address.city,
    state: formValue.address.state,
    zip: formValue.address.zip
  },
  phones: formValue.phones,
  role: 'CLIENT'
};


    this.loginService.register(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', JSON.stringify(res.access_token));
        localStorage.setItem('refresh_token', JSON.stringify(res.refresh_token));
        Swal.fire('Succès', 'Inscription réussie !', 'success');
        this.router.navigate(['/events']);
      },
      error: (err) => {
        Swal.fire('Erreur', err.error?.message || 'Erreur lors de l\'inscription', 'error');
      }
    });
  }
}
