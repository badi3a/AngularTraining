import {Component, OnInit} from '@angular/core';
import {Eventy} from '../../../models/eventy';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit {
  ListEvents: Eventy[];
  today = new Date();
  searchValue = '';
  
  constructor() {
  }
  ngOnInit() {
    this.ListEvents = [
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
      },
       {
      id: 3,
      title: 'React Conference',
      description: 'Conférence internationale sur React et son écosystème.',
      date: new Date('2025-06-20'),
      location: 'Sfax',
      price: 45,
      organizerId: 103,
      imageUrl: 'https://www.atmail.com/wp-content/uploads/2018/01/React_logo_wordmark.png',
      nbPlaces: 40,
      nbrLike: 5
    },
    {
      id: 4,
      title: 'Node.js Workshop',
      description: 'Atelier pratique sur le développement backend avec Node.js.',
      date: new Date('2025-09-15'),
      location: 'Monastir',
      price: 35,
      organizerId: 104,
      imageUrl: 'https://nodejs.org/static/images/logo.svg',
      nbPlaces: 20,
      nbrLike: 2
    },
    {
      id: 5,
      title: 'Vue.js Meetup',
      description: 'Rencontre conviviale pour les passionnés de Vue.js.',
      date: new Date('2025-12-05'),
      location: 'Sousse',
      price: 25,
      organizerId: 105,
      imageUrl: 'https://vuejs.org/images/logo.png',
      nbPlaces: 30,
      nbrLike: 1
    }
    ];
  }

  get filteredEvents(): Eventy[] {
    const q = this.searchValue.trim().toLowerCase();
    return !q ? this.ListEvents : this.ListEvents.filter(e =>
      e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)
    );
  }

  isExpired(e: Eventy): boolean {
    return e.date < this.today;
  }

  like(e: Eventy): void {
    if (this.isExpired(e) || e.nbPlaces <= 0) return;
    e.nbrLike++;
  }

  buyTicket(e: Eventy): void {
    if (this.isExpired(e) || e.nbPlaces <= 0) return;
    e.nbPlaces--;
}
}










