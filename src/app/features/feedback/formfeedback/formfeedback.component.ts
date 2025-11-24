import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { LoginService } from '../../../shared/data/login.service';

@Component({
  selector: 'app-formfeedback',
  templateUrl: './formfeedback.component.html',
  styleUrl: './formfeedback.component.css'
})
export class FormfeedbackComponent implements OnInit {

  eventId!: number;
  userEmail!: string | null;  

  rating = 0;
  stars = [1, 2, 3, 4, 5];
  comment = '';

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Récupération de l'event ID depuis l'URL
    this.eventId = Number(this.route.snapshot.paramMap.get("eventId"));

    // Récupération de l'email du user connecté
    this.userEmail = this.loginService.getCurrentUserEmail();

    if (!this.userEmail) {
      alert("Vous devez être connecté pour commenter !");
      this.router.navigate(['/users/login']);
      return;
    }
  }

  setRating(star: number) {
    this.rating = star;
  }

  submit() {
    if (!this.comment || this.rating === 0) {
      alert("Veuillez donner une note et un commentaire.");
      return;
    }

    const feedback = {
      message: this.comment,
      rate: this.rating

    };

    this.feedbackService.addFeedback(this.eventId, feedback).subscribe({
      next: () => {
        alert("Feedback ajouté !");
        this.router.navigate(['/events']);
      },
      error: err => {
        console.error(err);
        alert("Impossible d'ajouter votre feedback.");
      }
    });
  }
}
