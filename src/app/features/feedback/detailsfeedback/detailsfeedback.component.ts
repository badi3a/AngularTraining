import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../../../models/feedback';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../shared/data/feedback.service';
import { Eventy } from '../../../models/eventy';
import { EventsService } from '../../../shared/data/events.service';

@Component({
  selector: 'app-detailsfeedback',
  templateUrl: './detailsfeedback.component.html',
  styleUrls: ['./detailsfeedback.component.css'] // corrigé styleUrls
})
export class DetailsfeedbackComponent implements OnInit {

  feedbacks: FeedBack[] = [];
  eventId!: number;
  relatedEvents: Eventy[];
  currentEvent!: Eventy; // événement courant pour récupérer la location

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService,
    private eventService: EventsService

  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get("id"));
    
    // Charger l'événement courant
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        this.currentEvent = event;

        // Charger les feedbacks existants
        this.loadFeedbacks();

        // Charger les événements liés par location
        this.loadRelatedEvents(event.location);
      },
      error: (err) => console.error(err)
    });
  }

  loadFeedbacks() {
    this.feedbackService.getFeedbacksByEvent(this.eventId).subscribe({
      next: (res) => this.feedbacks = res,
      error: (err) => console.error(err)
    });
  }

loadRelatedEvents(location: string) {
  this.eventService.getEventsByLocation(location).subscribe({
    next: (res) => {
      this.relatedEvents = res.filter(e => e.id !== this.eventId);
    },
    error: (err) => console.error(err)
  });
}

}
