import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Eventy} from '../../../models/eventy';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../shared/data/events.service';
import { LoginService } from '../../../shared/data/login.service';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { FeedBack } from '../../../models/feedback';
import Swal from 'sweetalert2';

declare var bootstrap:any;
@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.css'
})
export class CardEventComponent implements OnInit {
    constructor(private route: ActivatedRoute,
                private eventService:EventsService, private login:LoginService, private feedbackService: FeedbackService) {
    }
    eventy: Eventy = new Eventy();
isUpdate: boolean = false;
events: Eventy[] = [];  // ← initialisé à un tableau vide pour éviter les erreurs

  searchValue: string;
  listEvents:Eventy[];
  @Input() e:Eventy;
  @Output() notificationLike:EventEmitter<Eventy>
    = new EventEmitter();
  likeEvent(e:Eventy) {
    this.notificationLike.emit(e);
  }
ngOnInit(): void {
    this.eventService.getAllEvents();
}

    nbrPlaceDecr(e:Eventy){
    e.nbplaces --
    this.eventService.updateEvent(e.id,e).subscribe()
  }
  //Marwa
  nbrLike(e:Eventy){
    e.nblikes ++
    this.eventService.updateEvent(e.id,e).subscribe()

  }
deleteEvent(id: number) {
  Swal.fire({
    title: 'Supprimer cet événement ?',
    text: "Cette action ne peut pas être annulée.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Oui, supprimer',
    cancelButtonText: 'Annuler',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return this.eventService.deleteEvent(id).toPromise()
        .then(() => true)
        .catch(error => {
          Swal.showValidationMessage('Échec de la suppression');
          throw error;
        });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      this.listEvents = this.listEvents.filter(e => e.id !== id);
      Swal.fire('Supprimé !', 'L\'événement a été supprimé.', 'success');
    }

  });
        this.eventService.getAllEvents();

}



editEvent(event: Eventy) {
  this.eventy = event;
}

update() {
  this.eventService.updateEvent(this.eventy.id, this.eventy)
    .subscribe(() => {
      alert("Updated!");
    });
}

  isClient(): boolean {
  return this.login.isClient();
}


  isAdmin(): boolean {
  return this.login.isAdmin();
}
  selectedEvent!: Eventy;
  rating = 0;
  stars = [1,2,3,4,5];
  comment = '';





  // Choisir rating
  setRating(r: number) {
    this.rating = r;
  }


openCommentModal(event: Eventy) {
  this.selectedEvent = event; // ← définit l'événement sélectionné
  setTimeout(() => {
    const modal = new bootstrap.Modal(document.getElementById('commentModal' + event.id));
    modal.show();
  }, 0);
}

submitComment(event: Eventy) {
  if (!this.comment || this.rating === 0) {
    alert("Veuillez donner une note et un commentaire.");
    return;
  }

  const feedback = {
    message: this.comment,
    rate: this.rating
  };

  this.feedbackService.addFeedback(event.id, feedback).subscribe({
    next: () => {
      alert('Commentaire ajouté !');
      this.comment = '';
      this.rating = 0;

      const modalEl = document.getElementById('commentModal' + event.id);
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    },
    error: err => {
      console.error("Erreur ajout feedback :", err);
      alert("Erreur lors de l'ajout du commentaire.");
    }
  });
}



}
