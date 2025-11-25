import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback';
import { FeedbackService } from '../../../shared/data/feedback.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  form: FormGroup;
  submitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const feedback: Feedback = this.form.value;

    this.feedbackService.createFeedback(feedback).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully!';
        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to submit feedback. Please try again.';
        this.submitting = false;
      },
    });
  }
}
