import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Eventy} from '../../../data-access/models/event';
import {EventsService} from '../../../data-access/services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent implements OnInit {
  event?: Eventy;
  constructor(private route:ActivatedRoute, private eventService:EventsService ) {
  }
  ngOnInit() {

    // Récupérer l'id depuis l'URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Chercher l'événement correspondant dans le service
    this.event = this.eventService.getEventById(id);

  }
}
