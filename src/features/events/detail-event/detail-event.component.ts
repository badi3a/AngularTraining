import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Event } from '../../../app/models/event';
import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventComponent implements OnInit {
  event: Event | undefined;
  events: Event[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.loadEvent();
    this.loadAllEvents();
  }

  loadEvent(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const eventId = +idParam;
      this.event = this.eventsService.getEventById(eventId);
    }
  }

  loadAllEvents(): void {
    this.events = this.eventsService.getAllEvents();
  }

  // Méthode pour obtenir les événements similaires (exclut l'événement actuel)
  getSimilarEvents(): Event[] {
    if (!this.event) return [];
    return this.events.filter(e => e.id !== this.event!.id);
  }

  // Méthodes utilitaires pour les templates
  getEventType(title: string): string {
    if (title.includes('Tournoi')) return 'TOURNOI';
    if (title.includes('Workshop')) return 'WORKSHOP';
    if (title.includes('LAN Party')) return 'LAN PARTY';
    return 'ÉVÉNEMENT';
  }

  getEventBadgeClass(title: string): string {
    if (title.includes('Tournoi')) return 'tournament-badge';
    if (title.includes('Workshop')) return 'workshop-badge';
    if (title.includes('LAN Party')) return 'lan-badge';
    return 'default-badge';
  }

  registerForEvent(): void {
    if (this.event) {
      alert(`Inscription à "${this.event.title}" confirmée !`);
    }
  }
}
