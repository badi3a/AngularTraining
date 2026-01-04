import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../shared/services/feedback.service';
import { Feedback } from '../../../models/feedback';
import {Eventy} from '../../../models/eventy';
import {DataEventsService} from '../../../shared/services/data-events.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  feedbacks: Feedback[] = [];
  listEvents: Eventy[];

  editFeedbackId: string | undefined = undefined;  // string pour correspondre au type de fb.id
  editFeedbackData: Feedback = {} as Feedback;

  newFeedback: Feedback = {
    userId: 1,
    eventId: 0,
    content: '',
    rate: 0,
    dateFeedback: new Date()
  };

  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private serviceEvent: DataEventsService
  ) {}

  ngOnInit(): void {
    // récupérer eventId depuis l'URL
    const idEvent = this.route.snapshot.paramMap.get('id');
    let event: Eventy;
    this.serviceEvent.getEventById(idEvent).subscribe(
      (data: Eventy) => {
        event=data; console.log(event);
        this.serviceEvent.getEventsByLocation(event.location).subscribe(
          (data: Eventy[]) => {
            this.listEvents = data;
            console.log(this.listEvents);
          }
        )

      }
    )


    this.newFeedback.eventId = idEvent ? Number(idEvent) : 0;

    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedbacks()
      .subscribe((res: Feedback[]) => {
        // Convertir eventId en nombre pour la comparaison
        this.feedbacks = res.filter(f => Number(f.eventId) === this.newFeedback.eventId);
        console.log('Feedbacks filtrés:', this.feedbacks);
      });
  }

  addFeedback(): void {
    this.newFeedback.dateFeedback = new Date();

    this.feedbackService.addFeedback(this.newFeedback)
      .subscribe(() => {
        this.loadFeedbacks();
        // reset champs
        this.newFeedback.content = '';
        this.newFeedback.rate = 0;
      });
  }

  // Fonction pour commencer l'édition
  startEdit(fb: Feedback): void {
    this.editFeedbackId = fb.id!;
    this.editFeedbackData = { ...fb }; // Copie des données
  }

  // Fonction pour sauvegarder les modifications
  saveEdit(): void {
    if (this.editFeedbackId) {
      // Mettre à jour la date de feedback
      this.editFeedbackData.dateFeedback = new Date();

      this.feedbackService.updateFeedback(this.editFeedbackId, this.editFeedbackData)
        .subscribe({
          next: () => {
            console.log('Feedback mis à jour avec succès');
            this.loadFeedbacks();
            this.cancelEdit();
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            alert('Erreur lors de la mise à jour du feedback');
          }
        });
    }
  }

  // Fonction pour annuler l'édition
  cancelEdit(): void {
    this.editFeedbackId = undefined;
    this.editFeedbackData = {} as Feedback;
  }

  // Fonction pour supprimer un feedback
  deleteFeedback(id: string | undefined): void {
    console.log('ID reçu pour suppression:', id);

    if (!id) {
      alert('Erreur: ID du feedback non trouvé');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce feedback ?')) {
      this.feedbackService.deleteFeedback(id)
        .subscribe({
          next: () => {
            console.log('Feedback supprimé avec succès');
            this.loadFeedbacks();
          },
          error: (error) => {
            console.error('Erreur complète:', error);
            alert(`Erreur lors de la suppression: ${error.status}`);
          }
        });
    }
  }
}
