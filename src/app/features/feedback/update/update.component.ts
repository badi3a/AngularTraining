import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../../models/feedback';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  feedbackId!: number;
  feedback!: FeedBack;

  rating = 0;
  stars = [1, 2, 3, 4, 5];
  comment = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {

    this.feedbackId = Number(this.route.snapshot.paramMap.get("id"));

    this.feedbackService.getFeedbackById(this.feedbackId).subscribe({
      next: fb => {
        this.feedback = fb;
        this.comment = fb.message;
        this.rating = fb.rate;
      },
      error: () => {
        alert("Impossible de charger le feedback.");
        this.router.navigate(['/feedback']);
      }
    });
  }

  setRating(star: number): void {
    this.rating = star;
  }

  update(): void {

    if (!this.comment.trim() || this.rating === 0) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const updatedFeedback: FeedBack = {
      id: this.feedbackId,
      message: this.comment,
      rate: this.rating
    };

    this.feedbackService.updateFeedback(this.feedbackId, updatedFeedback).subscribe({
      next: () => {
        alert("Feedback modifié avec succès !");
        this.router.navigate(['/feedback']);
      },
      error: () => alert("Erreur lors de la mise à jour.")
    });
  }
}
