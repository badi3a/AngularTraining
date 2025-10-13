import { Component, OnInit } from '@angular/core';
import { Event } from '../../../app/models/event';
import { EventsService } from '../../../shared/services/events.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  events: Event[] = [];
  pastEvents: Event[] = [];
  activeTab: string = 'upcoming';

  // Variables pour les likes/dislikes
  eventLikes = { likes: 0, dislikes: 0 };
  animateLike = false;
  animateDislike = false;

  constructor(private eventsService: EventsService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    // Événements à venir
    this.events = this.eventsService.getAllEvents();

    // Événements passés (exemple)
    this.pastEvents = [
      {
        id: 4,
        title: "Tournoi LoL Automne 2023",
        description: "Tournoi annuel de League of Legends avec 16 équipes participantes. Finale épique entre les équipes 'Dragons' et 'Titans'.",
        date: new Date('2023-11-15'),
        location: "Amphithéâtre Principal",
        price: 0,
        organizerId: 1,
        imageUrl: "/assets/images/lol-autumn.jpg",
        nbPlaces: 80,
        nbrLike: 45
      },
      {
        id: 5,
        title: "Valorant Showdown",
        description: "Compétition intense de Valorant avec format double élimination. Démonstrations de skill impressionnantes et clutchs mémorables.",
        date: new Date('2023-10-28'),
        location: "Salle Gaming",
        price: 0,
        organizerId: 1,
        imageUrl: "/assets/images/valorant-showdown.jpg",
        nbPlaces: 60,
        nbrLike: 32
      }
    ];
  }

  // Fonctions pour changer d'onglet
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  // Fonctions pour les likes/dislikes
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

  // Fonction pour s'inscrire à un événement (corrigée)
  registerForEvent(eventTitle: string): void {
    alert(`Inscription à ${eventTitle} confirmée !`);
  }

  // Méthodes pour le calendrier
  hasEventOnDay(day: number): boolean {
    const eventDays = [4, 7, 12, 15, 22];
    return eventDays.includes(day);
  }

  getEventOnDay(day: number): string {
    const eventMap: { [key: number]: string } = {
      4: 'Réunion Gaming',
      7: 'Entraînement LoL',
      12: 'LAN Party',
      15: 'Tournoi LoL',
      22: 'Workshop Valorant'
    };
    return eventMap[day] || '';
  }
}
