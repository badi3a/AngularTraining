
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
=======
import {Component, OnInit} from '@angular/core';
import {Event} from '../../models/event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit {
  events: Event[];
  today = new Date();
  searchTerm = '';
  constructor() {
  }
  ngOnInit() {
    this.events = [
      {
        id: 1,
        title: 'Angular Summit',
        description: 'Conférence sur Angular et l’écosystème front-end.',
        date: new Date('2025-11-10'),
        location: 'Tunis',
        price: 50,
        organizerId: 101,
        imageUrl: 'https://m.media-amazon.com/images/I/71vC4ryHjOL._UF1000,1000_QL80_.jpg',
        nbPlaces: 25,
        nbrLike: 0
      },
      {
        id: 2,
        title: 'Web Dev Days',
        description: 'Journée dédiée aux frameworks web modernes.',
        date: new Date('2025-01-05'),
        location: 'Ariana',
        price: 30,
        organizerId: 102,
        imageUrl: 'https://cdn.dribbble.com/userupload/37287941/file/original-a59d13499667b765fb5aceb8b5d5bf0d.jpg',
        nbPlaces: 0,
        nbrLike: 3
      }
    ];
  }
  get filteredEvents(): Event[] {
    const q = this.searchTerm.trim().toLowerCase();
    return !q ? this.events : this.events.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );
  }

  isExpired(e: Event): boolean {
    return e.date < this.today;
  }

  like(e: Event): void {
    if (this.isExpired(e) || e.nbPlaces <= 0) return;
    e.nbrLike++;
  }
}

