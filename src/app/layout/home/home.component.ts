import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event'; // Chemin corrigé
import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events: Event[] = [];

  // Variables pour les likes/dislikes (globales pour la page)
  eventLikes = { likes: 0, dislikes: 0 };
  animateLike = false;
  animateDislike = false;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.events = this.eventsService.getAllEvents();
  }

  // Méthodes pour les likes/dislikes (globales)
  handleLike(): void {
    this.eventLikes.likes++;
    this.animateLike = true;
    setTimeout(() => this.animateLike = false, 300);
  }

  handleDislike(): void {
    this.eventLikes.dislikes++;
    this.animateDislike = true;
    setTimeout(() => this.animateDislike = false, 300);
  }

  // Méthode pour s'inscrire
  registerForEvent(eventTitle: string): void {
    alert(`Inscription à ${eventTitle} confirmée !`);
  }
}
