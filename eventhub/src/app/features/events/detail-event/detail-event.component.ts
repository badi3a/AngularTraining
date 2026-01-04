import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataEventsService } from '../../../shared/services/data-events.service';
import { Eventy } from '../../../models/eventy';
import { FeedbackService } from '../../../shared/services/feedback.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrl: './detail-event.component.css'
})
export class DetailEventComponent implements OnInit {

  currentEvent: Eventy;

  defaultUserId: number = 1;

  constructor(
    private route: ActivatedRoute,
    private eventService: DataEventsService,
    private feedbackService: FeedbackService

  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    
    this.eventService.getEventById(id).subscribe(
      (data: Eventy) => {
        this.currentEvent = data;
      },
      (error) => {
        console.error("Erreur lors du chargement de l'événement :", error);
      }
    );
  }

}
