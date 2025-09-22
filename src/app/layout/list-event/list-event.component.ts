import { Component } from '@angular/core';

import { Event } from '../../models/event';
@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css']
})
export class ListEventComponent {
  searchTerm = '';

  events: Event[] = [
    {
      id: 1,
      title: 'Concert Jazz',
      description: 'Super concert pour les amateurs de jazz.',
      date: '2025-10-01',
      location: 'Salle de spectacle ESPRIT',
      price: 25,
      availablePlaces: 50,
      imageUrl: 'https://picsum.photos/400/250?random=1',
      likes: 0
    },
    {
      id: 2,
      title: 'Atelier Angular',
      description: 'Apprenez Angular en une journée intensive.',
      date: '2025-09-15',
      location: 'ESPRIT Lab',
      price: 0,
      availablePlaces: 0,
      imageUrl: 'https://picsum.photos/400/250?random=2',
      likes: 3
    },
    {
      id: 3,
      title: 'Festival de Danse',
      description: 'Performances de danse contemporaine et traditionnelle.',
      date: '2025-11-20',
      location: 'Théâtre Municipal',
      price: 30,
      availablePlaces: 100,
      imageUrl: 'https://picsum.photos/400/250?random=3',
      likes: 5
    }
  ];

  // Incrémente les likes de façon immuable
  likeEvent(event: Event) {
    this.events = this.events.map(e =>
      e.id === event.id ? { ...e, likes: e.likes + 1 } : e
    );
  }

  // Filtrage par titre ou lieu
  filterEvents(): Event[] {
    if (!this.searchTerm) return this.events;
    return this.events.filter(e =>
      e.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  trackById(index: number, event: Event): number {
    return event.id;
  }

  // Vérifie si l'événement peut être liké
  canLike(event: Event): boolean {
    const today = new Date();
    const eventDate = new Date(event.date);
    return event.availablePlaces > 0 && eventDate >= today;
  }
}