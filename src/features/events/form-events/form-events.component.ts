import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-events',
  templateUrl: './form-events.component.html',
  styleUrls: ['./form-events.component.css']
})
export class FormEventsComponent implements OnInit {
  eventForm: FormGroup;
  badgeOptions: string[] = ['Tournoi', 'Workshop', 'LAN Party', 'Rencontre', 'Compétition', 'Entraînement'];
  selectedBadge: string = 'Tournoi';

  // États des messages
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;
  showHelpMessage: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      date: ['', [Validators.required, this.futureDateValidator]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      location: ['', [Validators.required, Validators.minLength(3)]],
      maxParticipants: ['', this.positiveNumberValidator],
      games: [''],
      customBadge: ['']
    });
  }

  ngOnInit(): void {
    // Afficher le message d'aide au démarrage
    setTimeout(() => {
      this.showHelpMessage = true;
    }, 1000);
  }

  // Validateurs personnalisés
  futureDateValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : { pastDate: true };
  }

  positiveNumberValidator(control: any) {
    if (!control.value) return null;
    return control.value > 0 ? null : { invalidNumber: true };
  }

  // Méthodes de validation
  validateField(fieldName: string) {
    const control = this.eventForm.get(fieldName);
    if (control) {
      control.markAsTouched();
    }
  }

  validateDate() {
    const dateControl = this.eventForm.get('date');
    if (dateControl?.value) {
      const selectedDate = new Date(dateControl.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        dateControl.setErrors({ pastDate: true });
      }
    }
  }

  validateTime() {
    const startTime = this.eventForm.get('startTime')?.value;
    const endTime = this.eventForm.get('endTime')?.value;

    if (startTime && endTime && startTime >= endTime) {
      this.eventForm.get('endTime')?.setErrors({ timeConflict: true });
    }
  }

  validateParticipants() {
    const participants = this.eventForm.get('maxParticipants')?.value;
    if (participants && participants <= 0) {
      this.eventForm.get('maxParticipants')?.setErrors({ invalidNumber: true });
    }
  }

  validateGames() {
    const games = this.eventForm.get('games')?.value;
    if (games && games.length > 100) {
      this.eventForm.get('games')?.setErrors({ tooLong: true });
    }
  }

  // Méthodes utilitaires
  hasTimeConflict(): boolean {
    const startTime = this.eventForm.get('startTime')?.value;
    const endTime = this.eventForm.get('endTime')?.value;
    return startTime && endTime && startTime >= endTime;
  }

  getDateErrorMessage(): string {
    const errors = this.eventForm.get('date')?.errors;
    if (errors?.['pastDate']) {
      return 'La date doit être dans le futur';
    }
    if (errors?.['required']) {
      return 'La date est requise';
    }
    return 'Date invalide';
  }

  getFormProgress(): number {
    const totalFields = 6; // champs obligatoires
    const completedFields = [
      this.eventForm.get('title')?.valid,
      this.eventForm.get('type')?.valid,
      this.eventForm.get('description')?.valid,
      this.eventForm.get('date')?.valid,
      this.eventForm.get('startTime')?.valid,
      this.eventForm.get('location')?.valid
    ].filter(Boolean).length;

    return Math.round((completedFields / totalFields) * 100);
  }

  getBadgeIcon(badge: string): string {
    const icons: { [key: string]: string } = {
      'Tournoi': '🎯',
      'Workshop': '🛠️',
      'LAN Party': '🎮',
      'Rencontre': '👥',
      'Compétition': '🏆',
      'Entraînement': '💪'
    };
    return icons[badge] || '🏷️';
  }

  selectBadge(badge: string): void {
    this.selectedBadge = badge;
    this.eventForm.patchValue({ customBadge: '' });
  }

  onCustomBadgeInput(): void {
    const customBadge = this.eventForm.get('customBadge')?.value;
    if (customBadge && customBadge.trim() !== '') {
      this.selectedBadge = customBadge;
    }
  }

  onSubmit(): void {
    // Marquer tous les champs comme touchés
    this.markAllFieldsTouched();

    if (this.eventForm.valid) {
      const formData = {
        ...this.eventForm.value,
        badge: this.selectedBadge
      };

      console.log('Événement créé:', formData);

      // Simulation de succès
      this.showSuccessMessage = true;
      this.showErrorMessage = false;
      this.showHelpMessage = false;

      // Redirection après 2 secondes
      setTimeout(() => {
        this.router.navigate(['/evenement']);
      }, 2000);

    } else {
      // Afficher les erreurs
      this.showErrorMessage = true;
      this.errorMessage = 'Veuillez corriger les erreurs dans le formulaire avant de soumettre.';
      this.showSuccessMessage = false;
    }
  }

  onCancel(): void {
    if (this.eventForm.dirty) {
      if (confirm('Voulez-vous vraiment annuler ? Les modifications non enregistrées seront perdues.')) {
        this.router.navigate(['/evenement']);
      }
    } else {
      this.router.navigate(['/evenement']);
    }
  }

  private markAllFieldsTouched(): void {
    Object.keys(this.eventForm.controls).forEach(key => {
      this.eventForm.get(key)?.markAsTouched();
    });
  }
}
