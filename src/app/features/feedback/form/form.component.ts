import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { Feedback } from '../../../models/feedback';

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
  eventId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      rate: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
    });

    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id');
    });
  }

  submit() {
    if (this.form.invalid || !this.eventId) {
      this.form.markAllAsTouched();
      this.errorMessage = !this.eventId ? 'Event ID not found in URL.' : '';
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const feedback: Feedback = {
      ...this.form.value,
      event_id: this.eventId,
      date: new Date(),
      user_id: '1',
    };

    this.feedbackService.createFeedback(feedback).subscribe({
      next: () => {
        console.log(feedback);
        this.successMessage = 'Feedback submitted successfully!';
        this.form.reset();
        this.router.navigate(['/events/details', this.eventId]);

        this.submitting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to submit feedback. Please try again.';
        this.submitting = false;
      },
    });
  }
}
