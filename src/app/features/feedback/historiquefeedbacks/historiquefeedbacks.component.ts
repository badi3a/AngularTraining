import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { LoginService } from '../../../shared/data/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historiquefeedbacks',
  templateUrl: './historiquefeedbacks.component.html',
  styleUrl: './historiquefeedbacks.component.css'
})
export class HistoriquefeedbacksComponent implements OnInit {

  feedbacks: any[] = [];
  userEmail!: string | null;

  constructor(
    private feedbackService: FeedbackService,
    private login: LoginService,
    private router: Router
  ) {}

ngOnInit(): void {
  // Vérifie si connecté
  if (!this.login.getCurrentUserEmail()) {
    alert("Vous devez être connecté !");
    this.router.navigate(['/users/login']);
    return;
  }

  // Charge les feedbacks du user connecté
  this.loadMyFeedbacks();
}


  loadMyFeedbacks() {
    this.feedbackService.getFeedbackByCurrentUser().subscribe({
      next: data => {
        this.feedbacks = data;
      },
      error: err => {
        console.error(err);
        alert("Impossible de charger vos feedbacks.");
      }
    });
  }

deleteFeedback(id: number) {
  if (confirm("Voulez-vous supprimer ce feedback ?")) {
    this.feedbackService.deleteFeedback(id).subscribe({
      next: (msg) => {
        alert(msg); // shows "Feedback supprimé avec succès"
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
      },
      error: err => {
        console.error(err);
        alert("Suppression impossible.");
      }
    });
  }
}


  updateFeedback(feedback: any) {
    this.router.navigate(['/feedback/update', feedback.id]);
  }
}