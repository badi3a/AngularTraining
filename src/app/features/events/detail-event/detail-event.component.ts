import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../shared/data/events.service';
import { Eventy } from '../../../models/eventy';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css'] // ⚠️ ajout du 's'
})
export class DetailEventComponent implements OnInit {

  currentEvent!: Eventy | undefined; // le "!" évite les erreurs avant initialisation

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    // ✅ récupérer l'id depuis l'URL
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = +idParam; // conversion string -> number
      console.log('ID récupéré depuis l’URL :', id);

      // ✅ récupérer l'événement correspondant
      this.currentEvent = this.eventService.getEventById(id);

      console.log('Événement trouvé :', this.currentEvent);
    } else {
      console.warn('Aucun ID dans l’URL');
    }
  }
}
